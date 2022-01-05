const iconCard = '<g id="id_card"><path d="M21,3H3A3,3,0,0,0,0,6V18a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V6A3,3,0,0,0,21,3Zm1,15a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V6A1,1,0,0,1,3,5H21a1,1,0,0,1,1,1Z"></path><path d="M10.38,11.8a3,3,0,1,0-4.76,0C3.91,13.08,4,14.68,4,16a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1C12,14.79,12.15,13.13,10.38,11.8ZM7,10a1,1,0,0,1,2,0A1,1,0,0,1,7,10ZM6,15a2,2,0,0,1,4,0Z"></path><path d="M19,7H14a1,1,0,0,0,0,2h5A1,1,0,0,0,19,7Z"></path><path d="M19,11H14a1,1,0,0,0,0,2h5A1,1,0,0,0,19,11Z"></path><path d="M19,15H14a1,1,0,0,0,0,2h5A1,1,0,0,0,19,15Z"></path></g>'
const iconUpdCSV = '<g id="work-business-solid-task-upload"><path d="M11.62842,13.82812l-.00232-.00158-.00391-.00391-.00158-.00232c-.01728-.017-.03992-.02313-.05835-.03808a.74308.74308,0,0,0-.17908-.11939l-.0072-.00213a.74014.74014,0,0,0-.1706-.03431.7644.7644,0,0,0-.10656-.021l-.00458-.00092-.00275.00055a.75131.75131,0,0,0-.19891.03894.7258.7258,0,0,0-.07788.01569l-.01062.00342a.744.744,0,0,0-.18213.122c-.017.014-.03809.01953-.05408.03521l-.00159.00232-.0039.00391-.00232.00158L8.61572,15.80078a.74994.74994,0,1,0,1.06836,1.05274l.66016-.6698v3.21179a.75.75,0,0,0,1.5,0v-3.2121l.66064.67011a.74994.74994,0,1,0,1.06836-1.05274Z" fill="none"></path><path d="M11,10.25A6.75,6.75,0,1,0,17.75,17,6.75769,6.75769,0,0,0,11,10.25Zm0,12A5.25,5.25,0,1,1,16.25,17,5.25605,5.25605,0,0,1,11,22.25Z" fill="none"></path><path d="M7,6h8a.99974.99974,0,0,0,1-1V1a.99974.99974,0,0,0-1-1H7A.99974.99974,0,0,0,6,1V5A.99974.99974,0,0,0,7,6ZM8,2h6V4H8Z"></path><path d="M19,2H17.5a.5.5,0,0,0-.5.5V5a2,2,0,0,1-2,2H7A2,2,0,0,1,5,5V2.5A.5.5,0,0,0,4.5,2H3A3,3,0,0,0,0,5V27a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM11,23.75A6.75,6.75,0,1,1,17.75,17,6.75769,6.75769,0,0,1,11,23.75Z"></path><path d="M11,11.75A5.25,5.25,0,1,0,16.25,17,5.25605,5.25605,0,0,0,11,11.75Zm2.56543,5.11133a.7498.7498,0,0,1-1.06055-.00781l-.66064-.67011v3.2121a.75.75,0,0,1-1.5,0V16.18372l-.66016.6698a.74994.74994,0,0,1-1.06836-1.05274l1.94434-1.97266.00232-.00158.0039-.00391.00159-.00232c.016-.01568.03705-.02124.05408-.03521a.744.744,0,0,1,.18213-.122l.01062-.00342a.7258.7258,0,0,1,.07788-.01569.75131.75131,0,0,1,.19891-.03894l.00275-.00055.00458.00092a.7644.7644,0,0,1,.10656.021.74014.74014,0,0,1,.1706.03431l.0072.00213a.74308.74308,0,0,1,.17908.11939c.01843.015.04107.02111.05835.03808l.00158.00232.00391.00391.00232.00158,1.94482,1.97266A.75019.75019,0,0,1,13.56543,16.86133Z"></path></g>'
const iconExportCsv = '<g id="Layer_23"><path d="M21,31H8a3,3,0,0,1-3-3V22a3,3,0,0,1,3-3H21a3,3,0,0,1,3,3v6A3,3,0,0,1,21,31ZM8,21a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V22a1,1,0,0,0-1-1Z"></path><path d="M25,16H15a1,1,0,0,1-.92-.62,1,1,0,0,1,.21-1.09l10-10a1,1,0,0,1,1.09-.21A1,1,0,0,1,26,5V15A1,1,0,0,1,25,16Zm-7.59-2H24V7.41Z"></path><path d="M10.78,27.29a2.49,2.49,0,0,1-2.55-2.55,2.48,2.48,0,0,1,2.55-2.55A2.61,2.61,0,0,1,12,22.5a2.32,2.32,0,0,1,.88.85l-.84.48a1.25,1.25,0,0,0-.51-.51,1.51,1.51,0,0,0-.76-.19,1.52,1.52,0,0,0-1.15.45,1.75,1.75,0,0,0,0,2.32,1.51,1.51,0,0,0,1.15.44,1.61,1.61,0,0,0,.76-.18,1.2,1.2,0,0,0,.51-.51l.84.48A2.32,2.32,0,0,1,12,27,2.44,2.44,0,0,1,10.78,27.29Z"></path><path d="M15.15,27.29A2.16,2.16,0,0,1,13.93,27a1.69,1.69,0,0,1-.7-.88l.82-.48a1.12,1.12,0,0,0,1.13.74,1,1,0,0,0,.6-.14.47.47,0,0,0,.19-.37.45.45,0,0,0-.24-.41,3.53,3.53,0,0,0-.82-.31,5.15,5.15,0,0,1-.56-.19,2.68,2.68,0,0,1-.45-.27,1.07,1.07,0,0,1-.35-.41,1.38,1.38,0,0,1-.12-.59,1.32,1.32,0,0,1,.47-1.06,1.76,1.76,0,0,1,1.14-.4,1.92,1.92,0,0,1,1.05.29,2,2,0,0,1,.7.81l-.81.47a1,1,0,0,0-.94-.63.73.73,0,0,0-.47.14.44.44,0,0,0-.17.35.45.45,0,0,0,.19.38,2.77,2.77,0,0,0,.74.31l.34.11.31.11a1.72,1.72,0,0,1,.31.16,1.51,1.51,0,0,1,.25.18.93.93,0,0,1,.21.25,1.42,1.42,0,0,1,.13.3,1.6,1.6,0,0,1,.05.39,1.31,1.31,0,0,1-.49,1.08A2,2,0,0,1,15.15,27.29Z"></path><path d="M18.63,27.19,17,22.29H18l1.2,3.77,1.19-3.77h1.05l-1.65,4.9Z"></path><path d="M40,43H33.43a1,1,0,0,1,0-2H40a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H25.41L16,15.41V20a1,1,0,0,1-2,0V15a1,1,0,0,1,.29-.71l10-10A1,1,0,0,1,25,4H40a3,3,0,0,1,3,3V40A3,3,0,0,1,40,43Z"></path><path d="M30.57,43H17a3,3,0,0,1-3-3V30a1,1,0,0,1,2,0V40a1,1,0,0,0,1,1H30.57a1,1,0,0,1,0,2Z"></path><path d="M32,45a1,1,0,0,1-.81-.42l-5-7A1,1,0,0,1,27,36h1V31a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v5h1a1,1,0,0,1,.81,1.58l-5,7A1,1,0,0,1,32,45Zm-3.06-7L32,42.28,35.06,38H35a1,1,0,0,1-1-1V32H30v5a1,1,0,0,1-1,1Z"></path></g>'


miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'カード登録',
        svgIcon: iconCard, 
        positionPriority: 1,
        onClick: async () => {
			    await miro.board.ui.openModal('createsticker.html', { width: 500, height: 650 });
        },
      },
      toolbar: {
        title: '勤怠CSVｱｯﾌﾟﾛｰﾄﾞ',
        toolbarSvgIcon: iconUpdCSV, 
        librarySvgIcon: iconUpdCSV,
        positionPriority: 1,
        onClick: async () => {

			    await miro.board.ui.openModal('uploadAttendCsv.html', { width: 300, height: 200 });

		    }
	    }
	  }
  })
})
