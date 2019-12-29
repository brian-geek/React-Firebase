import React from 'react'
import {FormControl, DropdownButton, Dropdown} from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: theme.spacing(3),
        '&:focus': {
            outline: 'none'
        },
        height: 35
    },
    CustomMenu: {
        display: 'flex',
        flexDirection: 'row',
    }
})

class CustomMenu extends React.Component {
    state = {
        value: ''
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        const {style, classes, className, children, 'aria-labelledby': labeledBy,} = this.props
        return (
            <div style={style} className={className} aria-labelledby={labeledBy}>
            {
                this.props.callback && <div className={classes.CustomMenu}>
                <FormControl
                    autoFocus
                    as='input'
                    type='number'
                    style={{width: '100px'}}
                    className="mx-1 my-1"
                    placeholder='Type price...'
                    value={this.state.price}
                    onChange={this.handleChange.bind(this)}
                >
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button
                    }}
                    onClick={()=>{
                        if (this.state.value.length > 0) {
                            this.props.callback(this.state.value, true)
                        }
                    }}
                >
                    &#60;
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button
                    }}
                    onClick={()=>{
                        if (this.state.value.length > 0) {
                            this.props.callback(this.state.value, false)
                        }
                    }}
                >
                    >
                </Button>
                </div>
            }
                {children}
            </div>
        )
    }
}

class CustomToggle extends React.Component {
    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }    
    render() {
        const {classes} = this.props
        var title = ''
        var variant = 'contained'
        if (this.props.selected) {
            if (this.props.isSmaller === undefined) {
                title = this.props.selected
            } else {
                title = this.props.isSmaller?'< '+this.props.selected:'> '+this.props.selected
            }
        } else {
            variant = 'outlined'
            title = this.props.default
        }
        return (
            <Button
                variant={variant}
                color="primary"
                classes={{
                    root: classes.button
                }}
                onClick={this.handleClick.bind(this)}
            >
            {title}
            </Button>
        )
    }
}

class FilterButton extends React.Component {
    render() {
        const dropdownMenu = withStyles(styles)(CustomMenu)
        dropdownMenu.propTypes = {
            classes: PropTypes.object.isRequired,
        };
        const dropdownToggle = withStyles(styles)(CustomToggle)
        dropdownToggle.propTypes = {
            classes: PropTypes.object.isRequired,
        };
        const {children} = this.props
        return (
            <Dropdown>
                <Dropdown.Toggle as={dropdownToggle} {...this.props}/>
                <Dropdown.Menu as={dropdownMenu} {...this.props}>
                {children}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

FilterButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterButton)