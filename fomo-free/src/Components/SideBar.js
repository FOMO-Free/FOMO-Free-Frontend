import React, { useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { axiosWithAuth } from "../auth/axiosWithAuth";
import { groupsContext } from "../context/groupsContext"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);





export default function MiniDrawer() {
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // const { groups, setGroups } = useContext(groupsContext);
   
    
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const logout = () => {
        console.log("Logged out");
        localStorage.removeItem("token");
        history.push("/");
    };

    useEffect(() => {
        axiosWithAuth()
          .get("/usergroup/user")
          .then((res) => {
            console.log(res)
            
            
          })
          .catch((err) => {
            debugger;
          });
    }, []);
  
    return (    
    <Drawer variant="permanent" open={open}>
        <List OnMouseEnter={handleDrawerOpen} OnMouseLeave={handleDrawerClose}>
          {/* {groups.map((group, index) => (
              
            <ListItemButton
              key={group.name}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {group.pic}
              </ListItemIcon>
              <ListItemText primary={group.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))} */}
        </List>
        <Divider />
        <List>
          {["Create Group","Logout"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <AddCircleIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
}