import React from 'react';
import classNames from 'classNames';
import { connect } from 'react-redux';
import $ from 'jquery/dist/jquery.slim';
// import ColorPicker from 'react-simple-colorpicker';
import * as actions from '../../../actions';
import * as libs from '../../../lib';
import Button from './Button';
import EditLayoutSetting from './EditLayoutSetting';


className Toolbar extends React.Component {

	constructor(props)
	{
		super(props);

		this.state = {
			active: {
				setting: false,
				editBlockColor: false,
			},
			visible: {
				setting: true,
				shuffle: true,
				add: true,
				select: true,
				edit: false,
				removeImage: false,
				duplicate: false,
				removeBlock: false,
				editColor: false
			},
			activeBlockCount: 0,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState)
	{
		let newState = Object.assign({}, prevState);

		// update active block count
		newState.activeBlockCount = nextProps.tree.body.activeBlock.length;

		// select block
		if (prevState.activeBlockCount !== nextProps.tree.body.activeBlock.length)
		{
			let active = !!(nextProps.tree.body.activeBlock.length);
			newState.visible = Object.assign({}, newState.visible, {
				edit: false,
				removeImage: false,
				duplicate: active,
				removeBlock: active,
				editColor: active
			});
		}

		if (nextProps.tree.body.activeBlock[0])
		{
			// check image block
			let isImage = false;
			nextProps.tree.body.activeBlock.some(k => {
				if (nextProps.tree.body.grid[k].image)
				{
					isImage = true;
					return true;
				}
			});

			// select image block
			let block = nextProps.tree.body.grid[nextProps.tree.body.activeBlock[0]];
			newState.visible = Object.assign({}, newState.visible, {
				removeImage: isImage,
				edit: !!(block && block.image)
			});
		}

		return {
			...prevState,
			...newState,
		};
	}

	changeActive(keyName, userSW, event)
	{
		const { state } = this;
		const sw = userSW || !state.active[keyName];
		const cTarget = event ? event.currentTarget : null;

		if (sw)
		{
			$(document).on('click.pleToolbar', (e) => {
				if ($(e.target).closest('.ple-toolbar__pop').length) return;
				if (!(e.target === cTarget) && !(e.target.parentNode === cTarget))
				{
					this.changeActive(keyName, false);
				}
			});
		}
		else
		{
			$(document).off('click.pleToolbar');
		}

		this.setState({
			active: {
				...state.active,
				setting: false,
				editColor: false,
				[keyName] : sw,
			}
		});
	}

	deactivate()
	{
		$(document).off('click.pleToolbar');
		return new Promise((reject) => {
			this.setState({
				active: {
					setting: false,
					editColor: false,
				}
			}, reject);
		});
	}

	/**
	 * Submit edit setting
	 *
	 * @param {Object} state
	 * @return {Boolean}
	 */
	submitEditSetting(state)
	{
		// update setting
		this.props.dispatch(actions.body.updateSetting(state));

		// close palette
		libs.util.sleep(50).then(() => this.changeActive('setting', false));

		return false;
	}

	render()
	{
		const { state, props } = this;
		let activeBlockColor = '#fff';

		if (typeof props.tree.body.grid === 'object' && libs.object.isArray(props.tree.body.activeBlock))
		{
			const n = props.tree.body.activeBlock[0];
			activeBlockColor = (props.tree.body.grid[n] && props.tree.body.grid[n].color) ?
				props.tree.body.grid[n].color :
				props.setting.body.blockColor;
		}

		return (
			<nav className="ple-toolbar">
				<div className="ple-toolbar__wrap">
					{state.visible.setting && (
						<Button
							iconclassName="ple-ico-setting"
							className={classNames('ple-edit-setting', {
								'ple-toolbar__block-active': state.active.setting
							})}
							onClick={(e) => {
								e.stopPropagation();
								if (!state.active.setting)
								{
									this.deactivate().then(() => {
										this.changeActive('setting', null, e);
									});
								}
								else
								{
									this.changeActive('setting', false, e);
								}
							}}
							title="Edit preference">
							{state.active.setting && (
								<EditLayoutSetting
									submit={(e) => this.submitEditSetting(e)}
									setting={props.tree.body.setting}
									defaultSetting={props.setting.body.setting}/>
							)}
						</Button>
					)}
					{state.visible.shuffle && (
						<Button
							iconclassName="ple-ico-arrow-random"
							onClick={() => props.api.grid.shuffle()}
							title="Shuffle block"/>
					)}
					{state.visible.add && (
						<Button
							iconclassName="ple-ico-plus"
							onClick={() => props.api.grid.add()}
							title="Add block"/>
					)}
					{state.visible.select && (
						<Button
							iconclassName="ple-ico-select"
							onClick={() => props.api.grid.toggleSelectAll()}
							title="Toggle select block"/>
					)}

					{state.visible.edit && (
						<Button
							iconclassName="ple-ico-pencil"
							className="ple-toolbar__block-key"
							onClick={() => props.api.cropper.open(props.tree.body.activeBlock[0])}
							title="Edit block"/>
					)}
					{state.visible.removeImage && (
						<Button
							iconclassName="ple-ico-empty"
							className="ple-toolbar__block-key"
							onClick={() => props.api.grid.removeImages(props.tree.body.activeBlock)}
							title="Remove image in block"/>
					)}
					{state.visible.duplicate && (
						<Button
							iconclassName="ple-ico-duplicate"
							className="ple-toolbar__block-key"
							onClick={() => {
								if (props.tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));
							}}
							title="Duplicate block"/>
					)}
					{state.visible.removeBlock && (
						<Button
							iconclassName="ple-ico-trash"
							className="ple-toolbar__block-key"
							onClick={() => {
								if (props.tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								props.api.grid.remove(props.tree.body.activeBlock);
							}}
							title="Remove block"/>
					)}
					{state.visible.editColor && (
						<Button
							iconclassName="ple-ico-palette"
							className={classNames(
								'ple-edit-color',
								'ple-toolbar__block-key',
								{ 'ple-toolbar__block-active': state.active.editColor }
							)}
							onClick={(e) => {
								e.stopPropagation();
								if (!state.active.editColor)
								{
									this.deactivate().then(() => this.changeActive('editColor', null, e));
								}
								else
								{
									this.changeActive('editColor', false, e);
								}
							}}
							title="Change color">
							<div className="ple-colorPicker__wrap">
								{/*<ColorPicker*/}
								{/*	onChange={(color) => {*/}
								{/*		if (!color) return;*/}
								{/*		props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));*/}
								{/*	}}*/}
								{/*	color={activeBlockColor}*/}
								{/*	className="ple-colorPicker__body"/>*/}
							</div>
						</Button>
					)}
				</div>
			</nav>
		);
	}

}
Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = {
	dispatch: null,
	tree: null,
};


export default connect((state) => Object.assign({}, state, {}))(Toolbar);