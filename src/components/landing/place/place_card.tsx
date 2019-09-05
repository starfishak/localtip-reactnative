import React from 'react';
import glamorous from 'glamorous-native';

// app theme colors
import { colors } from '../../../styles/theme';

// components
import Title from './place_card';
import Address from './place_address'

const CardContainer = glamorous.view((props, theme) => {
    return ({
        height: 160,
        width: '85%',
        left: '7.5%',
        justifyContent: 'space-around'
    });
});

const PlaceNameContainer = glamorous.view((props, theme) => {
    return ({
        height: '30%',
        backgroundColor: colors.deep_sky_blue,
        justifyContent: 'center'
    });
});

const PlaceCard = ({ place_name, place_address }) => {
    return (
        <CardContainer>
            <PlaceNameContainer>
                <Title align="center" color={colors.white}>
                    {place_name}
                </Title>
            </PlaceNameContainer>
            <Address>{place_address}</Address>
        </CardContainer>
    );
};

export default PlaceCard;