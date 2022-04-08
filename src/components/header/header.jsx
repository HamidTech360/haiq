import React from 'react';
import { Tab, Tabs, Switch } from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

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

const Header = ({handleOpenModal, SwitchMode, mode, triggerClick}) => {

    const classes = useStyles()

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return ( 
        <div className="page-header">
            <img src="../../assets/logo.png" className='header-logo' alt="logo" />
            <span className='pull-right switch-label hideOnDesktop' >
                {mode===false?'LIGHT MODE':'DARK MODE'} 
                <Switch 
                    checked={mode}
                    onChange={()=>SwitchMode()}
                    classes={{
                        switchBase:classes.switchBase
                    }}
                />
            </span>
            <div className="pull-right">
                
                <Tabs className={classes.tabs}  value={value} onChange={handleChange} aria-label="nav tabs example">
                    <Tab label="PICK A PHOTO" style={{fontSize:'14px', fontWeight:'700'}}  onClick={()=>handleOpenModal()}/>
                    <Tab label="UPLOAD A PHOTO" style={{fontSize:'14px', fontWeight:'700'}} onClick={()=>triggerClick()} />
                    <Tab label="REVIEW" style={{fontSize:'14px', fontWeight:'700'}} />
                </Tabs>
            </div>
            <span className='pull-right switch-label hideOnMobile' >
                {mode===false?'LIGHT MODE':'DARK MODE'} 
                <Switch 
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
 
export default Header;