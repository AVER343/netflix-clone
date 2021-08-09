import React, { useEffect } from 'react';
import {Grid,Box} from '@chakra-ui/react'
import { Container, Error, Base, Title,OTPInput, Text, TextSmall, Link as LinkComponent, Input, Submit } from './styles/form';
export default function Form({ children, ...restProps }:any) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Error = function FormError({ children, ...restProps }:any) {
  return <Error {...restProps}>{children}</Error>;
};

Form.Base = function FormBase({ children, ...restProps }:any) {
  return <Base {...restProps}>{children}</Base>;
};

Form.Title = function FormTitle({ children, ...restProps }:any) {
  return <Title {...restProps}>{children}</Title>;
};

Form.Text = function FormText({ children, ...restProps }:any) {
  return <Text {...restProps}>{children}</Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...restProps }:any) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Form.Link = function FormLink({ children, ...restProps }:any) {
  return <LinkComponent {...restProps}>{children}</LinkComponent>;
};

Form.Input = function FormInput({ children, ...restProps }:any) {
  return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }:any) {
  return <Submit {...restProps}>{children}</Submit>;
};

Form.OTPInput = function FormError({ children,value, ...restProps }:any) {
  useEffect(()=>{},[value])
  return <OTPInput onKeyPress={(e)=>console.log(e)}  value={value} {...restProps}>{children}</OTPInput>;
      };