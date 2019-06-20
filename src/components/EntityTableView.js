"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router';

import "./EntityTableView.less";
import Icon from './Icon/Icon';

export const ENTITY_TABLE_CELL_TYPE_TEXT = 'ENTITY_TABLE_CELL_TYPE_TEXT';
export const ENTITY_TABLE_CELL_TYPE_LINK = 'ENTITY_TABLE_CELL_TYPE_LINK';
export const ENTITY_TABLE_CELL_TYPE_CALLBACK = 'ENTITY_TABLE_CELL_TYPE_CALLBACK';
export const ENTITY_TABLE_CELL_TYPE_TEXT_ICON = 'ENTITY_TABLE_CELL_TYPE_TEXT_ICON';

const EntityTableViewHeader = ({ headers }) => {
    return(
        <thead>
            <tr>
            {
                headers.map(header => {
                    return(
                        <th>{header}</th>
                    )
                })
            }
            </tr>
        </thead>
    )
};

EntityTableViewHeader.propTypes = {
    headers: PropTypes.array
};

EntityTableViewHeader.defaultProps = {
    headers: []
};

const EntityTableViewCell = ({ item }) => {
    const handleCellClick = (e) => {
        e.preventDefault();
        item['callback'](item['passToCallBack']);
    };

    switch(item['type']) {
        case ENTITY_TABLE_CELL_TYPE_LINK:
            return(
                <td className="entity-table-cell linkCell">
                    <Link to={item['href']}>{item['value']}</Link>
                </td>
            );

        case ENTITY_TABLE_CELL_TYPE_TEXT:
            return(
                <td className="entity-table-cell">{item['value']}</td>
            );

        case ENTITY_TABLE_CELL_TYPE_TEXT_ICON:
            return(
                <td className={'entity-table-cell __icon'}>
                    <Icon size="32" icon={item.icon} modificator="entity-table-cell_icon" />
                    <span className="entity-table-cell_text">{item['value']}</span>
                </td>
            );

        case ENTITY_TABLE_CELL_TYPE_CALLBACK:
            return(
                <td className="entity-table-cell linkCell">
                    <a
                        onClick={handleCellClick}
                        >{item['value']}</a>
                </td>
            );

        default:
            return(
                <td className="entity-table-cell"></td>
            );
    }
};

EntityTableViewCell.propTypes = {
    item: PropTypes.object
};

EntityTableViewCell.defaultProps = {
    item: {}
};

export class EntityTableView extends Component {
    render() {
        const { headers, items, emptyText, dataIsLoading } = this.props;

        let isListEmpty = false;
        let columnsCount = 0;

        if(items.length == 0) {
            isListEmpty = true;
            columnsCount = headers.length;
        }

        return(
            <table class="table swf-general-table-content">
                <EntityTableViewHeader
                    headers={headers}
                    />
                <tbody class="swf-admins-container">
                {
                    !isListEmpty ?
                    items.map(itemContent => {
                        return(
                            <tr>
                                {
                                    itemContent.map(item => {
                                        return(
                                            <EntityTableViewCell
                                                item={item} />
                                        )
                                    })
                                }
                            </tr>
                        )
                    }):
                    <tr>
                        <td colSpan={columnsCount} class="text-center swf-general-table-empty-cell">
                            { dataIsLoading?
                                <span></span>:
                                <em>{emptyText}</em>
                            }
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        )
    }
}

EntityTableView.propTypes = {
    items: PropTypes.array,
    headers: PropTypes.array,
    emptyText: PropTypes.string,
    dataIsLoading: PropTypes.bool
};

EntityTableView.defaultProps = {
    items: [],
    headers: [],
    emptyText: 'This list is empty',
    dataIsLoading: false
};
