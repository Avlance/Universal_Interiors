"use client";
import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  width: 50%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: var(--universal-fs-h8 --universal-font-extra-bold)
  // font-weight: 700;
  color: #222222;
  margin: 10px 0 8px 0;
`;

const ModalSubtitle = styled.p`
  font-size: var(--universal-fs-h3 --universal-font-medium)
  color: #6b7280;
  margin: 18px 0 24px 0;
`;

const TabsContainer = styled.div`
  display: flex;
  margin: 0px 20px 15px 220px;
  width: fit-content;
  padding: 8px;
  gap: 10px;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
`;

const Tab = styled.button`
  padding: 12px 16px;
  border: none;
  background-color: ${(props) => (props.active ? "#d50f25" : "transparent")};
  color: ${(props) => (props.active ? "#ffffff" : "#222222")};
  font-weight: 600;
  font-size: var(--universal-fs-h3 --universal-font-extra-bold)
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease; 
   border-radius: 0.4rem;
   
   &:hover {
    background-color: ${(props) => (props.active ? "#d50f25" : "#e5e5e5")};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  gap: 32px;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 0px 0 130px;
  cursor: pointer;
  transition: all 0.2s;
`;

const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #d50f25;
`;

const RadioLabel = styled.span`
  font-size: var(--universal-fs-h3);
  font-weight: 700;
  color: ${(props) => (props.active ? "#222222" : "#8692A6")};
  transition: color 0.2s ease;
`;

const RightSection = styled.div`
  flex: 1;
`;

const DiagramContainer = styled.div`
  padding: 20px;
  margin-bottom: 50px;
  margin-top: -20px;
  margin-left: -80px;
  background: #ffffff;
  text-align: center;
`;

const DiagramTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
`;

const DiagramImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const WardrobeDiagram = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const WardrobeDimensions = styled.div`
  margin-top: 20px;
`;

const WardrobeDimensionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-top: -50px;
  margin-left: -60px;
`;
const WardrobeDimensionRow2 = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-top: -50px;
  margin-left: -120px;
`;

const WardrobeDimensionLabel = styled.label`
  font-size: 16px;
  color: #222222;
  font-weight: 600;
  min-width: 100px;
  padding-top: 6px;
  margin-top: 27px;
`;

const WardrobeDimensionInputs = styled.div`
  display: flex;
  gap: 24px;
`;

const WardrobeDimensionSelect = styled.select`
  padding: 8px 15px;
  border: 1px solid #8692a6;
  border-radius: 8px;
  font-size: 14px;
  background: #ffffff;
  color: #8692a6;
  width: 80px;

  appearance: none; /* removes native arrow */
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238692A6' strokeWidth='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center; /* pushes arrow inward */
  background-size: 10px 6px;
`;

const DimensionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DimensionLabel = styled.span`
  font-size: var(--universal-fs-h3);
  color: #8692a6;
  font-weight: var(--universal-font-bold);
`;

const WardrobeDimensionSpan = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const ModalFooter = styled.div`
  margin: -20px 0 0 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  background-color: #ffffff;
`;

const FooterText = styled.p`
  font-size: var(--universal-fs-h3);
  color: #222222;
  margin: -10px 0 0 0;
  line-height: 1.5;
  font-weight: var(--universal-font-bold);
`;

const ProceedButton = styled.button`
  background: #d50f25;
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 0 0 -10px 450px;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
`;

const CustomizeModal = ({ onClose, onProceed }) => {
  const [activeTab, setActiveTab] = useState("kitchen");
  const [selectedLayout, setSelectedLayout] = useState("u-shaped");
  const [selectedBedroom, setSelectedBedroom] = useState("bedroom1");
  const [wardrobeLength, setWardrobeLength] = useState({
    feet: 10,
    inches: 10,
  });
  const [kitchenDimensions, setKitchenDimensions] = useState({
    wallA: { feet: 10, inches: 0 },
    wallB: { feet: 10, inches: 0 },
    wallC: { feet: 2, inches: 0 },
  });

  const layouts = [
    {
      id: "l-shaped",
      label: "L-Shaped",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/kitchen-guide/l-shaped-kitchen-frame.webp",
    },
    {
      id: "u-shaped",
      label: "U-Shaped",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/kitchen-guide/u-shaped-kitchen-frame.webp",
    },
    {
      id: "parallel",
      label: "Parallel",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/kitchen-guide/parallel-kitchen-frame.webp",
    },
    {
      id: "straight",
      label: "Straight",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/kitchen-guide/stright-kitchen-frame.webp",
    },
  ];

  const getCurrentLayout = () => {
    return layouts.find((layout) => layout.id === selectedLayout) || layouts[1];
  };

  const bedrooms = [
    {
      id: "bedroom1",
      label: "Bedroom 1",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/wardrobe-guide/sliding-door-wardrobe-frame.webp",
    },
    {
      id: "bedroom2",
      label: "Bedroom 2",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/wardrobe-guide/walkin-wardrobe-frame.webp",
    },
    {
      id: "bedroom3",
      label: "Bedroom 3",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/wardrobe-guide/l-shaped-wardrobe-frame.webp",
    },
    {
      id: "bedroom4",
      label: "Bedroom 4",
      image:
        "https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/wardrobe-guide/builtin-wardrobe-frame.webp",
    },
  ];

  const getCurrentLayout2 = () => {
    return (
      bedrooms.find((bedroom) => bedroom.id === selectedBedroom) || bedrooms[1]
    );
  };

  const updateWardrobeLength = (type, value) => {
    setWardrobeLength((prev) => ({
      ...prev,
      [type]: parseInt(value),
    }));
  };

  const updateKitchenDimension = (wall, type, value) => {
    setKitchenDimensions((prev) => ({
      ...prev,
      [wall]: {
        ...prev[wall],
        [type]: parseInt(value),
      },
    }));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Customize Your Interiors Before Estimation</ModalTitle>
          <ModalSubtitle>
            Fine-tune the dimensions and preferences for a more accurate
            estimate
          </ModalSubtitle>
        </ModalHeader>

        <TabsContainer>
          <Tab
            active={activeTab === "kitchen"}
            onClick={() => setActiveTab("kitchen")}
          >
            Modular Kitchen
          </Tab>
          <Tab
            active={activeTab === "wardrobe"}
            onClick={() => setActiveTab("wardrobe")}
          >
            Wardrobe
          </Tab>
        </TabsContainer>

        <ModalBody>
          {activeTab === "kitchen" ? (
            <>
              {/* Modular */}
              <LeftSection>
                <RadioGroup>
                  {layouts.map((layout) => (
                    <RadioOption key={layout.id}>
                      <RadioInput
                        type="radio"
                        name="layout"
                        value={layout.id}
                        checked={selectedLayout === layout.id}
                        onChange={(e) => setSelectedLayout(e.target.value)}
                      />
                      <RadioLabel active={selectedLayout === layout.id}>
                        {layout.label}
                      </RadioLabel>
                    </RadioOption>
                  ))}
                </RadioGroup>
              </LeftSection>

              <RightSection>
                <DiagramContainer>
                  {selectedLayout === "u-shaped" ? (
                    <DiagramImage
                      src="https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/kitchen-guide/u-shaped-kitchen-frame.webp"
                      alt="U-Shaped Kitchen Layout Diagram"
                    />
                  ) : (
                    <DiagramImage
                      src={getCurrentLayout().image}
                      alt={`${getCurrentLayout().label} Kitchen Layout Diagram`}
                    />
                  )}
                </DiagramContainer>

                <WardrobeDimensions>
                  <WardrobeDimensionRow>
                    <WardrobeDimensionLabel>Wall A</WardrobeDimensionLabel>
                    <WardrobeDimensionInputs>
                      <DimensionBlock>
                        <DimensionLabel>Feet</DimensionLabel>
                        <WardrobeDimensionSelect
                          value={kitchenDimensions.wallA.feet}
                          onChange={(e) =>
                            updateKitchenDimension(
                              "wallA",
                              "feet",
                              e.target.value
                            )
                          }
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </WardrobeDimensionSelect>
                      </DimensionBlock>

                      <DimensionBlock>
                        <DimensionLabel>Inches</DimensionLabel>
                        <WardrobeDimensionSelect
                          value={kitchenDimensions.wallA.inches}
                          onChange={(e) =>
                            updateKitchenDimension(
                              "wallA",
                              "inches",
                              e.target.value
                            )
                          }
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </WardrobeDimensionSelect>
                      </DimensionBlock>
                    </WardrobeDimensionInputs>
                  </WardrobeDimensionRow>
                </WardrobeDimensions>
              </RightSection>
            </>
          ) : (
            <>
              {/* wardrobe */}
              <LeftSection>
                <RadioGroup>
                  {bedrooms.map((bedroom) => (
                    <RadioOption key={bedroom.id}>
                      <RadioInput
                        type="radio"
                        name="bedroom"
                        value={bedroom.id}
                        checked={selectedBedroom === bedroom.id}
                        onChange={(e) => setSelectedBedroom(e.target.value)}
                      />
                      <RadioLabel active={selectedBedroom === bedroom.id}>
                        {bedroom.label}
                      </RadioLabel>
                    </RadioOption>
                  ))}
                </RadioGroup>
              </LeftSection>

              <RightSection>
                <DiagramContainer>
                  {selectedBedroom === "u-shaped" ? (
                    <DiagramImage
                      src="https://universalcmsdev.blob.core.windows.net/universal-website-container/guides/kitchen-guide/u-shaped-kitchen-frame.webp"
                      alt="U-Shaped Kitchen Layout Diagram"
                    />
                  ) : (
                    <DiagramImage
                      src={getCurrentLayout2().image}
                      alt={`${
                        getCurrentLayout2().label
                      } wardrobe Layout Diagram`}
                    />
                  )}
                </DiagramContainer>

                <WardrobeDimensions>
                  <WardrobeDimensionRow2>
                    <WardrobeDimensionLabel>
                      Wardrobe Length
                    </WardrobeDimensionLabel>
                    <WardrobeDimensionInputs>
                      <DimensionBlock>
                        <DimensionLabel>Feet</DimensionLabel>
                        <WardrobeDimensionSelect
                          value={kitchenDimensions.wallA.feet}
                          onChange={(e) =>
                            updateKitchenDimension(
                              "wallA",
                              "feet",
                              e.target.value
                            )
                          }
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </WardrobeDimensionSelect>
                      </DimensionBlock>

                      <DimensionBlock>
                        <DimensionLabel>Inches</DimensionLabel>
                        <WardrobeDimensionSelect
                          value={kitchenDimensions.wallA.inches}
                          onChange={(e) =>
                            updateKitchenDimension(
                              "wallA",
                              "inches",
                              e.target.value
                            )
                          }
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </WardrobeDimensionSelect>
                      </DimensionBlock>
                    </WardrobeDimensionInputs>
                  </WardrobeDimensionRow2>
                </WardrobeDimensions>
              </RightSection>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <FooterText>
            Your custom selections have been saved. Click to view estimated
            cost.
          </FooterText>
          <ProceedButton onClick={onProceed}>
            Proceed to Estimation
          </ProceedButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomizeModal;

