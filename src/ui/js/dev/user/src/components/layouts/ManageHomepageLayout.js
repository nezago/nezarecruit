/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  FaUnderline,
  FaItalic,
  FaBold,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaSuperscript,
  FaSubscript,
  FaStrikethrough,
  FaListOl,
  FaListUl,
  FaLink,
  FaUnlink,
  FaUndo,
  FaRedo,
  FaBackspace,
  FaCopy,
  FaCut,
  FaTypo3,
} from 'react-icons/fa';
import {
  handleTypingEmailInIframe,
  displayFontFamilies, displayFontSizes,
} from '../../helpers/functions/handlers';

export class ManageHomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    displayFontFamilies(document.getElementById('fontChanger'));
    displayFontSizes(document.getElementById('fontSize'));
    handleTypingEmailInIframe();
  }

  render() {
    return (
      <div>

        {/** MANAGE EDITOR PORTION */}
        <div
          className="mt-5 width-80 color-rigth-grey-transparent p-2 mb-5"
        >
          <div>
            <label htmlFor="recipient-email" className="form-group form-row">
              <input
                type="email"
                name="recipient-email"
                id="recipient-email"
                placeholder="Email"
                className="form-control form-control-sm rounded-corners col-md-10"
                readOnly
                hidden
              />
            </label>
          </div>


          <div>
            <label htmlFor="emailMsgIframe" className="form-group form-row">
              <div
                id="textEditor"
                className="col-md-12"
              >
                <div className="text-center text-22">
                  <span>
                    What is NezaRecruit?
                  </span>
                </div>
                <div id="theRibbon">
                  <button type="button" id="boldBtn" title="Bold"><FaBold /></button>
                  <button type="button" id="italicBtn" title="Italic"><FaItalic /></button>
                  <button type="button" id="underlineBtn" title="Underline"><FaUnderline /></button>
                  <button type="button" id="justifyLeftBtn" title="Align left"><FaAlignLeft /></button>
                  <button type="button" id="justifyCenterBtn" title="Align Center"><FaAlignCenter /></button>
                  <button type="button" id="justifyRightBtn" title="Align Right"><FaAlignRight /></button>
                  <button type="button" id="justifyFullBtn" title="Align Justify"><FaAlignJustify /></button>
                  <button type="button" id="supBtn" title="Superscript">
                    <FaSuperscript />
                  </button>
                  <button type="button" id="subBtn" title="Subscript">
                    <FaSubscript />
                  </button>
                  <button type="button" id="strikeBtn" title="Strikethrough"><FaStrikethrough /></button>
                  <button type="button" id="orderedListBtn" title="Numbered list"><FaListOl /></button>
                  <button type="button" id="unorderedListBtn" title="Bulleted list"><FaListUl /></button>
                  <input type="color" id="fontcolorBtn" title="Change Font color" />
                  <input type="color" id="highlightBtn" title="Highlight Text" />
                  <select id="fontChanger" />
                  <select id="fontSize" />
                  <button type="button" id="linkBtn" title="Create a link"><FaLink /></button>
                  <button type="button" id="unlinkBtn" title="Remove a link"><FaUnlink /></button>
                  <button type="button" id="undoBtn" title="Undo the previous action"><FaUndo /></button>
                  <button type="button" id="redoBtn" title="Redo"><FaRedo /></button>
                  <button type="button" id="backspaceBtn" title="Delete previous character"><FaBackspace /></button>
                  <button type="button" id="copyBtn" title="Copy"><FaCopy /></button>
                  <button type="button" id="cutBtn" title="Cut"><FaCut /></button>
                  <button type="button" id="selectAllBtn" title="Select all"><FaTypo3 /></button>
                </div>
                <div id="richTextArea">
                  <iframe
                    title="email-message-iframe"
                    id="emailMsgIframe"
                    name="emailMsgIframe"
                    frameBorder="0"
                  />
                </div>

                {/** WRITE A WHY HERE */}

                <div className="text-center text-22 mt-3">
                  <span>
                    Why does NezaRecruit matters to you?
                  </span>
                </div>

                <div id="theRibbon">
                  <button type="button" id="boldBtn" title="Bold"><FaBold /></button>
                  <button type="button" id="italicBtn" title="Italic"><FaItalic /></button>
                  <button type="button" id="underlineBtn" title="Underline"><FaUnderline /></button>
                  <button type="button" id="justifyLeftBtn" title="Align left"><FaAlignLeft /></button>
                  <button type="button" id="justifyCenterBtn" title="Align Center"><FaAlignCenter /></button>
                  <button type="button" id="justifyRightBtn" title="Align Right"><FaAlignRight /></button>
                  <button type="button" id="justifyFullBtn" title="Align Justify"><FaAlignJustify /></button>
                  <button type="button" id="supBtn" title="Superscript">
                    <FaSuperscript />
                  </button>
                  <button type="button" id="subBtn" title="Subscript">
                    <FaSubscript />
                  </button>
                  <button type="button" id="strikeBtn" title="Strikethrough"><FaStrikethrough /></button>
                  <button type="button" id="orderedListBtn" title="Numbered list"><FaListOl /></button>
                  <button type="button" id="unorderedListBtn" title="Bulleted list"><FaListUl /></button>
                  <input type="color" id="fontcolorBtn" title="Change Font color" />
                  <input type="color" id="highlightBtn" title="Highlight Text" />
                  <select id="fontChanger" />
                  <select id="fontSize" />
                  <button type="button" id="linkBtn" title="Create a link"><FaLink /></button>
                  <button type="button" id="unlinkBtn" title="Remove a link"><FaUnlink /></button>
                  <button type="button" id="undoBtn" title="Undo the previous action"><FaUndo /></button>
                  <button type="button" id="redoBtn" title="Redo"><FaRedo /></button>
                  <button type="button" id="backspaceBtn" title="Delete previous character"><FaBackspace /></button>
                  <button type="button" id="copyBtn" title="Copy"><FaCopy /></button>
                  <button type="button" id="cutBtn" title="Cut"><FaCut /></button>
                  <button type="button" id="selectAllBtn" title="Select all"><FaTypo3 /></button>
                </div>
                <div id="richTextArea">
                  <iframe
                    title="email-message-iframe"
                    id="emailMsgIframe"
                    name="emailMsgIframe"
                    frameBorder="0"
                  />
                </div>

                {/** SAVING BTN */}
                <div className="mb-5">
                  <button
                    type="button"
                    className="btn btn-block btn-sm btn-success"
                    id="send-msg-btn"
                  >
                    <span id="spinner-border" />
                    <span id="span-send-msg">Save a Manage</span>
                    <span id="spinner-grow" />
                    <span id="spinner-grow" />
                    <span id="spinner-grow" />
                  </button>
                  <div
                    id="send-email-error-div"
                    className="text-danger text-center text-17"
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageHomepageLayout;
