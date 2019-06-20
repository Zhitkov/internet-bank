"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';

import './SecondaryMenu.less';


/**
 * @typedef {Object} ISecondaryMenuItem
 * @property {number} [id]
 *
 * @property {number} [type]
 * @property {string} label
 * @property {Array.<ISecondaryMenuItem>} subItems
 *
 * @property {boolean} [isActive]
 * @property {string} [href]
 * @property {boolean} [isDisabled = false]
 */

/**
 * @typedef {Object} ISecondaryMenu
 * @property {Array.<ISecondaryMenuItem>} items
 */


export const SECONDARY_MENU_ITEM_TEXT = 'SECONDARY_MENU_ITEM_TEXT';
export const SECONDARY_MENU_ITEM_LINK = 'SECONDARY_MENU_ITEM_LINK';


/**
 * @param {ISecondaryMenuItem} item
 * @param {number} index
 * @return {string}
 */
function createSecondaryMenuItemKey(item, index) {
    return item.id
        ? item.id.toString()
        : `${index}_${item.label}`;
}


class SecondaryMenuItem extends Component {
    render() {
        /**
         * @type {ISecondaryMenuItem}
         */
        const item = this.props.item;
        const isActive = item.isActive;
        const isDisabled = item.isDisabled;
        const itemLabel = item.label;

        return <div className={classnames(
                'second-menu-item',
                {
                    '__active': isActive
                }
            )}>

            <Choose>
                <When condition={item.type === SECONDARY_MENU_ITEM_LINK}>

                    <Choose>
                        <When condition={isDisabled}>
                            <span className="second-menu-item_text __disabled">
                                {itemLabel}
                            </span>
                        </When>
                        <Otherwise>
                            <If condition={isActive}>
                                <span className="second-menu-item_text __active">
                                    {itemLabel}
                                </span>
                            </If>
                            <If condition={!isActive}>
                                <Link className="second-menu-item_text"
                                      to={item.href}>
                                    {itemLabel}
                                </Link>
                            </If>
                        </Otherwise>
                    </Choose>

                </When>

                <Otherwise>
                    <span className={classnames(
                        'second-menu-item_text',
                            {
                                '__active': isActive
                            }
                        )}>
                        {item.label}
                    </span>
                </Otherwise>
            </Choose>

            <If condition={item.subItems}>
                <div className="second-menu-item_sub-items">
                    {item.subItems.map((item, index) =>
                        <SecondaryMenuItem item={item}
                                           key={createSecondaryMenuItemKey(item, index)} />
                    )}
                </div>
            </If>
        </div>
    }
}

SecondaryMenuItem.propTypes = {
    item: PropTypes.object.isRequired
};


class SecondaryMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /**
         * @type {ISecondaryMenu}
         */
        const menu = this.props.menu;

        return (<div className="secondary-menu">
            {menu.items.map((item, index) =>
                <SecondaryMenuItem item={item}
                                   key={createSecondaryMenuItemKey(item, index)} />
            )}
        </div>);
    }
}

SecondaryMenu.propTypes = {
    menu: PropTypes.object.isRequired
};


export default SecondaryMenu;