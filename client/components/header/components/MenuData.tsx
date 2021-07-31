export enum MenuTitles_ENUM{
    MAIN='main',
    SETTINGS='settings',
    REGISTER='register'
}
interface menu_props{
    leftIcon?:any,
    rightIcon?:any,
    goToMenu?:MenuTitles_ENUM
    name:string
}
export let MenuData:{[id in MenuTitles_ENUM]:menu_props[]}={
    main:[{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.SETTINGS,
        name:'SETTINGS'
    },{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.REGISTER,
        name:'REGISTER'
    },],
    register:[],
    settings:[]
}
interface main_menu_props extends menu_props{
    goToMenu:MenuTitles_ENUM;
}
export let menu_representation:main_menu_props[]=[
    {
        goToMenu:MenuTitles_ENUM.MAIN,
        name:'Main'
    },
    {
        goToMenu:MenuTitles_ENUM.SETTINGS,
        name:'Settings'
    },
    {
        goToMenu:MenuTitles_ENUM.REGISTER,
        name:'Register'
    },
]