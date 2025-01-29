import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';


import Auth from '../utils/auth';
import type { User } from '../models/User';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

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



const SignUp = () => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    password: '',
  });
  const [showAlert, setShowAlert] = useState(false);


  const [addUser] = useMutation(ADD_USER);

  const navigate = useNavigate();



  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
            input:{
                username: userFormData.username,
                password: userFormData.password
            }
        }
      });

      if (!data) {
        throw new Error('Something went wrong!');
      }

      const { token } = data.login;
      Auth.login(token);
      
      navigate("/")
      
      setUserFormData({
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    
  };

  return (
    <>
    <h1>FILLER SIGNUP</h1>
      <StyledForm onSubmit={handleFormSubmit}>
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
          {showAlert && (
            <Feedback>Username is required!</Feedback>
          )}
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
          {showAlert && (
            <Feedback>Password is required!</Feedback>
          )}
        </FormGroup>

        <StyledButton
          type="submit"
          disabled={!(userFormData.username && userFormData.password)}
        >
          Submit
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default SignUp;
