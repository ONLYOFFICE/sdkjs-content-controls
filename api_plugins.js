/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

(function(window, undefined)
{
	/**
	 * This method allows to add an empty content control to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControl
	 * @param {ContentControlType} type is a numeric value that specifies the content control type
	 * @param {ContentControlProperties}  [ properties = {} ] is property of content control
	 * @returns {ContentControl} return json with "Tag", "Id", "Lock" and "InternalId" values of created content control
	 * @example
	 * var type = 1;
	 * var properties = {"Id": 100, "Tag": "CC_Tag", "Lock": 3};
	 * window.Asc.plugin.executeMethod("AddContentControl", [type, properties]);
	 */
	window["asc_docs_api"].prototype["pluginMethod_AddContentControl"] = function(type, properties)
	{
		var _content_control_pr;
		if (properties)
		{
			_content_control_pr      = new AscCommon.CContentControlPr();
			_content_control_pr.Id   = properties["Id"];
			_content_control_pr.Tag  = properties["Tag"];
			_content_control_pr.Lock = properties["Lock"];

			_content_control_pr.Alias = properties["Alias"];

			if (undefined !== properties["Appearance"])
				_content_control_pr.Appearance = properties["Appearance"];

			if (undefined !== properties["Color"])
				_content_control_pr.Color = new Asc.asc_CColor(properties["Color"]["R"], properties["Color"]["G"], properties["Color"]["B"]);
		}

		var _obj = this.asc_AddContentControl(type, _content_control_pr);
		if (!_obj)
			return undefined;
		return {"Tag" : _obj.Tag, "Id" : _obj.Id, "Lock" : _obj.Lock, "InternalId" : _obj.InternalId};
	};

	/**
	 * This method allows to add an empty content control checkbox to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlCheckBox
	 * @param {ContentControlCkeckBoxProperties}  [ properties = {} ] is property of content control checkbox
	 * @example
	 * var properties = {"Checked": false, "CheckedSymbol": 9746, "UncheckedSymbol": 9744};
	 * window.Asc.plugin.executeMethod("AddContentControlCheckBox", [properties]);
	 */
	window["asc_docs_api"].prototype["pluginMethod_AddContentControlCheckBox"] = function(properties)
	{
		var oPr;
		if (properties)
		{
			oPr = new AscCommon.CSdtCheckBoxPr()
			if (properties["Checked"])
				oPr.SetChecked(properties["Checked"]);
			if (properties["CheckedSymbol"])
				oPr.SetCheckedSymbol(properties["CheckedSymbol"]);
			if (properties["UncheckedSymbol"])
				oPr.SetUncheckedSymbol(properties["UncheckedSymbol"]);
		}
		this.asc_AddContentControlCheckBox(oPr);
	};

	/**
	 * This method allows to add an empty content control picture to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlPicture
	 * @example
	 * window.Asc.plugin.executeMethod("AddContentControlPicture");
	 */
	window["asc_docs_api"].prototype["pluginMethod_AddContentControlPicture"] = function()
	{
		this.asc_AddContentControlPicture();
	};

	/**
	 * This method allows to add an empty content control list to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlList
	 * @param {ContentControlType} type is a numeric value that specifies the content control type
	 * @param {Array[{String, String}]}  [ List = [{sDisplay, sValue}] ] is property of content control List
	 * @example
	 * var type = 1; //1 - ComboBox  0 - DropDownList
	 * var List = [{sDisplay: "Item1_D", sValue: "Item1_V"}, {sDisplay: "Item2_D", sValue: "Item2_V"}];
	 * window.Asc.plugin.executeMethod("AddContentControlList", [type, List]);
	 */
	window["asc_docs_api"].prototype["pluginMethod_AddContentControlList"] = function(type, List)
	{
		var oPr;
		if (List)
		{
			oPr = new AscCommon.CSdtComboBoxPr();
			List.forEach(function(el) {
				oPr.AddItem(el.sDisplay, el.sValue);
			});
		}
		this.asc_AddContentControlList(type, oPr);
	};

	/**
	 * This method allows to add an empty content control datepicker to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlDatePicker
	 * @param {ContentControlDatePickerProperties}  [ properties = {} ] is property of content control datepicker
	 * @example
	 * var DateFormats = [
	 * "MM/DD/YYYY",
	 * "dddd\,\ mmmm\ dd\,\ yyyy",
	 * "DD\ MMMM\ YYYY",
	 * "MMMM\ DD\,\ YYYY",
	 * "DD-MMM-YY",
	 * "MMMM\ YY",
	 * "MMM-YY",
	 * "MM/DD/YYYY\ hh:mm\ AM/PM",
	 * "MM/DD/YYYY\ hh:mm:ss\ AM/PM",
	 * "hh:mm",
	 * "hh:mm:ss",
	 * "hh:mm\ AM/PM",
	 * "hh:mm:ss:\ AM/PM"
	 * ];
	 * var Date = new window.Date();
	 * var properties = {"DateFormat" : DateFormats[2], "Date" : Date};
	 * window.Asc.plugin.executeMethod("AddContentControlDatePicker", [properties]);
	 */
	window["asc_docs_api"].prototype["pluginMethod_AddContentControlDatePicker"] = function(properties)
	{
		var oPr;
		if (properties)
		{
			oPr = new AscCommon.CSdtDatePickerPr();
			if (properties.Date)
				oPr.SetFullDate(properties.Date);
			if (properties.DateFormat)
				oPr.SetDateFormat(properties.DateFormat);
		}
		this.asc_AddContentControlDatePicker(oPr);
	};

})(window);
