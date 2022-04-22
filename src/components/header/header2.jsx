import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, Switch } from '@material-ui/core';
import {createStyles, makeStyles, Theme, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

//styles
import './header.css'

const useStyles = makeStyles((theme)=>
    createStyles({
        tabs:{
            "& .MuiTabs-indicator":{
                backgroundColor:'#22ED0B',
                width:'30px'
            }
        },
        switchBase:{
            color:'black',
            "&$checked":{
                color:'red'
            },
            "&checked + $track":{
                backgroundColor:'yellow'
            },
            "MuiSwitch-track":{
                backgroundColor:'yellow'
            }
            // "& .Mui-checked":{
            //     color:'yellow'
            // },
            // "& .MuiSwitch-color-secondary":{
            //     color:'yellow'
            // }

        }
    })
)

const theme = createMuiTheme({
    overrides:{
        MuiSwitch:{
            track:{
                "$checked:not($colorPrimary):not(colorSecondary) + &":{
                    backgroundColor:'#22ED0B'
                },
                "$checked$colorPrimary + &":{
                    backgroundColor:'green'
                },
                "$checked$colorSecondary + &":{
                    backgroundColor:'green'
                }
            }
        }
    }
})

const Header2 = ({ SwitchMode, mode, activeTab}) => {

    const classes = useStyles()

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return ( 
        <div className="page-header">
            <Link to="/">
                <img src="../../assets/logo.png" className='header-logo' alt="logo" />
            </Link>
            <span className='pull-right switch-label hideOnDesktop' >
                {mode===false?'LIGHT MODE':'DARK MODE'} 
                <MuiThemeProvider theme={theme}>
                <Switch 
                    color="default"
                    checked={mode}
                    onChange={()=>SwitchMode()}
                    classes={{
                        switchBase:classes.switchBase
                    }}
                />
                </MuiThemeProvider>
            </span>
            <div className="pull-right">
                
                <Tabs value={activeTab} className={classes.tabs}   onChange={handleChange} aria-label="nav tabs example">
                    <Link to="/create"  style={{color:'initial', textDecoration:'none'}}><Tab label="PICK A PHOTO" style={{fontSize:'13px', fontWeight:'700'}} /></Link>
                    <Link to="/create" style={{color:'initial', textDecoration:'none'}}><Tab label="UPLOAD A PHOTO" style={{fontSize:'13px', fontWeight:'700'}} /></Link>
                    <Link to="/review"  style={{color:'initial', textDecoration:'none'}}><Tab label="REVIEW" style={{fontSize:'14px', fontWeight:'700'}} /></Link>
                </Tabs>
            </div>
            <span className='pull-right switch-label hideOnMobile' >
                {mode===false?'LIGHT MODE':'DARK MODE'} 
                <Switch 
                    color="default"
                    checked={mode}
                    onChange={()=>SwitchMode()}
                    classes={{
                        switchBase:classes.switchBase
                    }}
                />
            </span>
            
           
        </div>
     );
}
 
export default Header2;