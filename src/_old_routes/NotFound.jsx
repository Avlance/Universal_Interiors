"use client";
import React from 'react';
import { Link } from '@/utils/react-router-dom';
import Layout from '../components/layout/Layout';
import styled from 'styled-components';

const PageContent = styled.div`
  padding: 40px 20px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
  
  @media (max-width: 1024px) {
    padding: 30px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #4286F5;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #222222;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: #666666;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: ${props => props.$primary ? '#4286F5' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#4286F5'};
  text-decoration: none;
  border: 2px solid #4286F5;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$primary ? '#3367d6' : '#4286F5'};
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

const NotFound = () => {
  return (
    <Layout>
      <PageContent>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorDescription>
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </ErrorDescription>
        <ActionButtons>
          <Button to="/" $primary>
            Go to Homepage
          </Button>
          <Button to="/designs">
            Browse Designs
          </Button>
        </ActionButtons>
      </PageContent>
    </Layout>
  );
};

export default NotFound;


