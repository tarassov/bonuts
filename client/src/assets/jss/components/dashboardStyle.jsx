import {card,cardContainer} from 'assets/jss/baseStyles'


const dashboardStyle = theme => ({
    placeholder: {
        height: '30px'
    },
    card: {
        ...card
    },

    cardContainer: {
      ...cardContainer
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },

    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },

    button: {
        margin: theme.spacing.unit,
    },
    dashboardToolbar: {
        padding: 0,
    },
    dashboardPath: {
        flex: 1,
        height: 50,
        margin: 0,
        padding: 0,
    },
    dashboardMenu: {
        height: 50,
        margin: 0,
        padding: 0
    },
    dashboardMenuItem: {
        height:50,
        padding: 0,
        margin:0
    },

    inlineBlock: {
        display: 'inline-block',
        margin: 0,
        padding: 0,
        minWidth: 0,
        textTransform: 'none'
    }
});

 export default  dashboardStyle;
