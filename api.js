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


(function(window, document) {
    window['Asc']['Addons'] = window['Asc']['Addons'] || {};
	window['Asc']['Addons']['content-controls'] = true; // register addon
	
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControl'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControl = function(nType, oContentControlPr)
	{
		var oLogicDocument = this.WordControl.m_oLogicDocument;
		if (!oLogicDocument)
			return null;

		var oResult = null;
		if (c_oAscSdtLevelType.Block === nType)
		{
			if (false === oLogicDocument.Document_Is_SelectionLocked(AscCommon.changestype_ContentControl_Add, null))
			{
				oLogicDocument.StartAction(AscDFH.historydescription_Document_AddBlockLevelContentControl);

				var oContentControl = oLogicDocument.AddContentControl(c_oAscSdtLevelType.Block);
				if (oContentControl)
				{
					if (oContentControlPr)
						oContentControl.SetContentControlPr(oContentControlPr);

					oLogicDocument.Recalculate();
					oLogicDocument.UpdateInterface();
					oLogicDocument.UpdateSelection();

					oResult = oContentControl.GetContentControlPr();
				}

				oLogicDocument.FinalizeAction();
			}
		}
		else if (c_oAscSdtLevelType.Inline === nType)
		{
			if (false === oLogicDocument.Document_Is_SelectionLocked(AscCommon.changestype_ContentControl_Add, null))
			{
				oLogicDocument.StartAction(AscDFH.historydescription_Document_AddInlineLevelContentControl);

				var oContentControl = oLogicDocument.AddContentControl(c_oAscSdtLevelType.Inline);
				if (oContentControl)
				{
					if (oContentControlPr)
						oContentControl.SetContentControlPr(oContentControlPr);

					oLogicDocument.Recalculate();
					oLogicDocument.UpdateInterface();
					oLogicDocument.UpdateSelection();

					oResult = oContentControl.GetContentControlPr();
				}

				oLogicDocument.FinalizeAction();
			}
		}
		return oResult;
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlCheckBox'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlCheckBox = function(oPr, oFormPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;
		
		if (oPr && oFormPr)
		{
			if (oPr.GroupKey)
			{
				oPr.CheckedSymbol   = 0x25C9;
				oPr.UncheckedSymbol = 0x25CB;
			}
			else
			{
				oPr.CheckedSymbol   = 0x2611;
				oPr.UncheckedSymbol = 0x2610;
			}
			
			oPr.CheckedFont   = "Segoe UI Symbol";
			oPr.UncheckedFont = "Segoe UI Symbol";
		}
		
		var nCheckedSymbol   = oPr && oPr.CheckedSymbol ? oPr.CheckedSymbol : Asc.c_oAscSdtCheckBoxDefaults.CheckedSymbol;
		var nUncheckedSymbol = oPr && oPr.UncheckedSymbol ? oPr.UncheckedSymbol : Asc.c_oAscSdtCheckBoxDefaults.UncheckedSymbol;
		var sCheckedFont     = oPr && oPr.CheckedFont ? oPr.CheckedFont : Asc.c_oAscSdtCheckBoxDefaults.CheckedFont;
		var sUncheckedFont   = oPr && oPr.UncheckedFont ? oPr && oPr.UncheckedFont : Asc.c_oAscSdtCheckBoxDefaults.UncheckedFont;

		var isLoadFonts = false;
		if (!AscCommon.IsAscFontSupport(sCheckedFont, nCheckedSymbol))
		{
			isLoadFonts = true;
			AscFonts.FontPickerByCharacter.getFontBySymbol(nCheckedSymbol);
		}
		
		if (!AscCommon.IsAscFontSupport(sUncheckedFont, nUncheckedSymbol))
		{
			isLoadFonts = true;
			AscFonts.FontPickerByCharacter.getFontBySymbol(nUncheckedSymbol);
		}
		
		function private_PerformAddCheckBox()
		{
			oLogicDocument.RemoveTextSelection();
			if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
			{
				oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlCheckBox);

				var oCC = oLogicDocument.AddContentControlCheckBox(oPr);
				if (oCC && oFormPr)
				{
					oCC.SetFormPr(oFormPr);
					oCC.UpdatePlaceHolderTextPrForForm();
				}

				if (oCC && oCommonPr)
					oCC.SetContentControlPr(oCommonPr);

				oLogicDocument.UpdateInterface();
				oLogicDocument.Recalculate();
				oLogicDocument.FinalizeAction();
			}
		}
		
		if (isLoadFonts)
		{
			var oFonts = {};
			oFonts[sCheckedFont]   = true;
			oFonts[sUncheckedFont] = true;
			
			AscCommon.Check_LoadingDataBeforePrepaste(this, oFonts, {}, private_PerformAddCheckBox);
		}
		else
		{
			private_PerformAddCheckBox();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlPicture'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlPicture = function(oFormPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		oLogicDocument.RemoveTextSelection();
		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlPicture);

			var oCC = oLogicDocument.AddContentControlPicture();
			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
				oCC.ConvertFormToFixed();
				oCC.SetPictureFormPr(new AscCommon.CSdtPictureFormPr());
			}

			if (oCC && oCommonPr)
				oCC.SetContentControlPr(oCommonPr);

			oLogicDocument.UpdateInterface();
			oLogicDocument.Recalculate();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlList'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlList = function(isComboBox, oPr, oFormPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		oLogicDocument.RemoveTextSelection();
		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlList);

			var oCC;
			if (isComboBox)
				oCC = oLogicDocument.AddContentControlComboBox(oPr);
			else
				oCC = oLogicDocument.AddContentControlDropDownList(oPr);

			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
			}

			if (oCC && oCommonPr)
				oCC.SetContentControlPr(oCommonPr);

			oLogicDocument.Recalculate();
			oLogicDocument.UpdateInterface();
			oLogicDocument.UpdateSelection();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlDatePicker'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlDatePicker = function(oPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		oLogicDocument.RemoveTextSelection();
		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlList);
			var oCC = oLogicDocument.AddContentControlDatePicker(oPr, oCommonPr);

			if (oCC && oCommonPr)
				oCC.SetContentControlPr(oCommonPr);

			oLogicDocument.Recalculate();
			oLogicDocument.UpdateInterface();
			oLogicDocument.UpdateSelection();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlTextForm'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlTextForm = function(oPr, oFormPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlTextForm);

			var oCC = oLogicDocument.AddContentControlTextForm(oPr);
			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
			}

			oLogicDocument.UpdateInterface();
			oLogicDocument.Recalculate();
			oLogicDocument.FinalizeAction();
		}
	};

})(window, window.document);
