import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import { createUser } from '../utils/api';
import Auth from '../utils/auth';
import type { User } from '../models/User';

// Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Feedback = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

// const Alert = styled.div<{ show: boolean }>`
//   display: ${({ show }) => (show ? 'block' : 'none')};
//   background-color: #f8d7da;
//   color: #721c24;
//   border: 1px solid #f5c6cb;
//   border-radius: 0.25rem;
//   padding: 1rem;
//   margin-top: 1rem;
//   position: relative;

//   button {
//     position: absolute;
//     top: 0.5rem;
//     right: 0.5rem;
//     background: transparent;
//     border: none;
//     font-size: 1.25rem;
//     cursor: pointer;
//   }
// `;

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedSnippet: [],
  });

  const [validated] = useState(false);
  const [setShowAlert] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { token } = await response.json();
      Auth.login(token);
      handleModalClose();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedSnippet: [],
    });
  };

  return (
    <>
      <StyledForm noValidate validated={validated} onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          {!userFormData.username && <Feedback>Username is required!</Feedback>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {!userFormData.email && <Feedback>Email is required!</Feedback>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {!userFormData.password && <Feedback>Password is required!</Feedback>}
        </FormGroup>

        <StyledButton
          type="submit"
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        >
          Submit
        </StyledButton>
      </StyledForm>

      {/* <Alert show={showAlert}>
        Something went wrong with your signup!
        <button onClick={() => setShowAlert(false)}>&times;</button>
      </Alert> */}
    </>
  );
};

export default SignupForm;
