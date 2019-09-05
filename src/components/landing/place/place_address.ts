import glamorous from 'glamorous-native';
import { colors } from '../../../styles/theme';

const Address = glamorous.text((props, theme) => {
    return ({
        fontFamily: 'robotoRegular',
        fontSize: 12,
        color: props.color || colors.black,
        lineHeight: 18,
        textAlign: props.align || 'left',
        alignSelf: props.alignSelf || 'center'
    });
});

export default Address;