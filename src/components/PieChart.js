import React, { useState } from 'react';
import { VictoryPie, VictoryLegend } from 'victory';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const LabelContainer = styled('div')`
  position: relative;
  top: ${props => (props.smallScreen ? '150px' : '160px')};
  left: ${props => (props.midScreen ? '145px' : '75px')};
  width: 160px;
  height: 40px;
`;
const PrivateLabelContainer = styled('div')`
  position: relative;
  top: 200px;
  left: ${props => (props.smallScreen ? '80px' : props.midScreen ? '90px' : '150px')};
  width: 60%;
  z-index: 1;
`;

const Label = styled('div')`
  opacity: ${props => (props.content ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  text-align: center;
  font-size: 16px;
  &::before {
    content: '${props => props.content}';
  }
`;
const PrivateLabel = styled('div')`
  text-align: center;
  font-size: 22px;
  &::before {
    content: '${props => props.content}';
  }
`;

const ImageStyle = styled('div')`
  filter: ${props => props.policy && 'blur(0.8rem)'};
`;

const defaultColorScale = [
  '#4B3991',
  '#8B0033',
  '#C8283D',
  '#EE5634',
  '#FB9E4F',
  '#FDDA79',
  '#E0F686',
  '#9ED893',
  '#57B894',
  '#2A74AF'
];

const privateColorScale = [
  '#DCDCDC',
  '#D3D3D3',
  '#C0C0C0',
  '#A9A9A9',
  '#808080',
  '#696969',
  '#778899',
  '#708090'
];

const PieChart = ({ chartContent, chartLegend, setToPrivate, privateLabel }) => {
  const [centerLabel, setCenterLabel] = useState({ number: null, label: null, category: null });
  const mediaMax1299 = useMediaQuery('(max-width:1299px)');
  const mediaMin1300 = useMediaQuery('(min-width:1300px)');
  const mediaMax1600 = useMediaQuery('(max-width:1600px)');
  const mediaMin1300Max1600 = mediaMin1300 && mediaMax1600;

  const labelControl = (
    <LabelContainer smallScreen={mediaMax1299} midScreen={mediaMin1300Max1600}>
      <Label content={centerLabel.label} />
      {centerLabel.category !== 'Tropic group' ? (
        <Label content={centerLabel.number && `${centerLabel.number}%`} />
      ) : (
        <Label content={centerLabel.number && `${centerLabel.number}kg/ha`} />
      )}
    </LabelContainer>
  );

  const privateLabelControl = setToPrivate && (
    <PrivateLabelContainer smallScreen={mediaMax1299} midScreen={mediaMin1300Max1600}>
      <PrivateLabel content={privateLabel} />
    </PrivateLabelContainer>
  );

  return (
    <>
      {privateLabelControl}
      <ImageStyle policy={setToPrivate}>
        {labelControl}
        <svg width="100%" height={mediaMax1299 ? 330 : 360}>
          <VictoryLegend
            standalone={mediaMax1600}
            colorScale={setToPrivate ? privateColorScale : defaultColorScale}
            x={310}
            title={chartLegend.title}
            centerTitle
            style={{
              title: { fontSize: 18 }
            }}
            data={chartLegend.data}
          />
          <VictoryPie
            standalone={false}
            innerRadius={90}
            height={mediaMax1299 ? 250 : 280}
            width={mediaMax1299 ? 350 : 350}
            padding={{
              right: mediaMin1300Max1600 ? 0 : 80,
              left: mediaMin1300Max1600 ? 100 : 40
            }}
            labels={() => null}
            colorScale={setToPrivate ? privateColorScale : defaultColorScale}
            data={chartContent}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: 'data',
                        mutation: data => {
                          const {
                            datum: { x: label, y: number }
                          } = data;
                          setCenterLabel({
                            category: chartLegend.title,
                            number,
                            label
                          });
                        }
                      },
                      {
                        target: 'data',
                        mutation: () => ({
                          style: {
                            fill: 'smoke',
                            opacity: 0.6,
                            transition: '0.25s ease-in-out'
                          }
                        })
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: 'data',
                        mutation: () => {
                          setCenterLabel({
                            category: null,
                            number: null,
                            label: null
                          });
                        }
                      },
                      {
                        target: 'data',
                        mutation: () => {}
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </svg>
      </ImageStyle>
    </>
  );
};

PieChart.propTypes = {
  chartContent: PropTypes.array,
  chartLegend: PropTypes.shape({
    title: PropTypes.string,
    data: PropTypes.array
  })
};

export default PieChart;
