import glamorous from 'glamorous-native';
import { colors } from '../../../styles/theme';

const Title = glamorous.text((props, theme) => {
    return ({
        fontFamily: 'robotoRegular',
        fontSize: 16,
        color: props.color || colors.black,
        lineHeight: 24,
        textAlign: props.align || 'left',
        alignSelf: props.alignSelf || 'center'
    });
});

export default Title;