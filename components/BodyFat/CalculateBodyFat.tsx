import React, { useState } from "react";
import { Input, Select, Button, Typography, Form, InputNumber } from "antd";
import styled from "styled-components";

interface CalculateBodyFatProps {
  gender: "male" | "female";
  age: number;
}

const { Option } = Select;

const Title = styled(Typography.Title)`
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Label = styled(Form.Item)`
  margin-bottom: 8px;
`;

const ButtonContainer = styled(Form.Item)`
  margin-top: 24px;
  text-align: center;
`;

const ResultContainer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const CalculateBodyFat: React.FC<CalculateBodyFatProps> = ({ gender, age }) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [neckSize, setNeckSize] = useState(0);
  const [waistSize, setWaistSize] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [selectedGender, setGender] = useState<"male" | "female">(gender);
  const [selectedAge, setAge] = useState<number>(age);

  const calculateBodyFat = () => {
    let bodyFatValue;
    if (selectedGender === "male") {
      bodyFatValue =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistSize - neckSize) +
            0.15456 * Math.log10(height)) -
        450;
    } else {
      bodyFatValue =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistSize + height - neckSize) +
            0.221 * Math.log10(height)) -
        450;
    }
    setBodyFat(bodyFatValue);
  };

  const getBodyFatStatus = () => {
    if (selectedGender === "male") {
      if (bodyFat < 6) {
        return "Essential Fat";
      } else if (bodyFat >= 6 && bodyFat <= 24) {
        return "Athletic";
      } else if (bodyFat >= 25 && bodyFat <= 29) {
        return "Fitness";
      } else if (bodyFat >= 30 && bodyFat <= 37) {
        return "Acceptable";
      } else {
        return "Obese";
      }
    } else {
      if (bodyFat < 16) {
        return "Essential Fat";
      } else if (bodyFat >= 16 && bodyFat <= 30) {
        return "Athletic";
      } else if (bodyFat >= 31 && bodyFat <= 35) {
        return "Fitness";
      } else if (bodyFat >= 36 && bodyFat <= 42) {
        return "Acceptable";
      } else {
        return "Obese";
      }
    }
  };

  return (
    <>
      <Title level={2}>Body Fat Calculator</Title>
      <FormContainer>
        <Form layout="vertical">
          <Label label="Gender">
            <Select
              defaultValue={selectedGender}
              onChange={(value: "male" | "female") => setGender(value)}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Label>
          <Label label="Age">
            <InputNumber
              value={selectedAge}
              onChange={(value) => setAge(value ?? 0)}
            />
          </Label>
          <Label label="Height (cm)">
            <InputNumber
              value={height}
              onChange={(value) => setHeight(value ?? 0)}
            />
          </Label>
          <Label label="Weight (kg)">
            <InputNumber
              value={weight}
              onChange={(value) => setWeight(value ?? 0)}
            />
          </Label>
          <Label label="Neck Size (cm)">
            <InputNumber
              value={neckSize}
              onChange={(value) => setNeckSize(value ?? 0)}
            />
          </Label>
          <Label label="Waist Size (cm)">
            <InputNumber
              value={waistSize}
              onChange={(value) => setWaistSize(value ?? 0)}
            />
          </Label>
          <ButtonContainer>
            <Button type="primary" onClick={calculateBodyFat}>
              Calculate Body Fat
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
      {bodyFat !== 0 && (
        <ResultContainer>
          <Title level={4}>Your Body Fat Percentage:</Title>
          <Typography.Paragraph>{bodyFat.toFixed(2)}%</Typography.Paragraph>
          <Title level={4}>Body Fat Status:</Title>
          <Typography.Paragraph>{getBodyFatStatus()}</Typography.Paragraph>
        </ResultContainer>
      )}
    </>
  );
};

export default CalculateBodyFat;