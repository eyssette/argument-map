const canvas = document.querySelector('#element')
    const box = canvas.getBoundingClientRect()
    let graphInitial = [{
        id: 'p1',
        text: 'Prémisse 1',
        x: box.width * 1.5 / 3,
        y: box.height * 1 / 3 - 125
      },
      {
        id: 'p2',
        text: 'Prémisse 2',
        x: box.width * 2 / 3,
        y: box.height * 1 / 3 - 125
      },
      {
        id: 'c1',
        text: 'Conclusion',
        x: box.width / 2 + 150,
        y: box.height * 2 / 3
      },
      {
        from: ['p1', 'p2'],
        to: 'c1'
      },
      //   {id: 'o1', text: 'Objection', x: 440, y: box.height*1/3-20, lineType:'dashed'},
      //   {from: 'o1', to: 'p1'}
    ]



    var codageArgument=localStorage.getItem('codageArgument')
    if (codageArgument) {
      graphInitial=JSON.parse(codageArgument)
    }
    argumentTest = Reasons.mapper('#element-test')

    if(window.location.hash) {
      var newHash = window.location.hash.substring(1);
      hashDecode = decodeURI(newHash); 
      if (JSON.parse(hashDecode)){        
        graphInitial=JSON.parse(hashDecode)
        argumentTestRender = argumentTest.render(graphInitial)
        if (argumentTestRender) {
          if (hashDecode != codageArgument) {
            localStorage.setItem('codageArgument', hashDecode)
            location.reload()
          }
        }
      } else {}
  } else {

  }


    argument = Reasons.mapper('#element')
    argumentRender = argument.render(graphInitial)

    var uri = window.location.href.split("#")[0];

    var autosave = true
    var developerMode=false

    function saveMap() {
      return JSON.stringify(argumentRender["export"]())
    }

    setInterval(function () {
      if (autosave == true) {
        codageArgument = saveMap()
        localStorage.setItem('codageArgument', codageArgument)
      }
    }, 2000);

    var codageArgumentTextArea = document.getElementById("codageArgument")

    

    /* Comportement de la boîte modale */
    // Get the modal
    var modal = document.getElementById("myModal")

    // Get the button that opens the modal
    var btnModal = document.getElementById("createLink")

    // Get the <span> element that closes the modal
    var closeModal = document.getElementById("closeModal");

    // When the user clicks on the button, open the modal
    btnModal.onclick = function toggleModal() {
      autosave = false
      codageArgumentTextArea.value = saveMap();
      if (developerMode==true) {modal.classList.add("modal-active");} else {

        codageArgument=codageArgumentTextArea.value
      if (JSON.parse(codageArgument)){
        graphInitial=JSON.parse(codageArgument)
        argumentTestRender = argumentTest.render(graphInitial)
        if (argumentTestRender) {
          localStorage.setItem('codageArgument', codageArgument)
          location.replace(uri+'#' + codageArgumentTextArea.value);
        }
      } else {location.reload();}
      autosave = true
      }
    }

    // When the user clicks on (x), close the modal
    closeModal.onclick = function () {
      codageArgument=codageArgumentTextArea.value
      if (JSON.parse(codageArgument)){
        graphInitial=JSON.parse(codageArgument)
        argumentTestRender = argumentTest.render(graphInitial)
        if (argumentTestRender) {
          localStorage.setItem('codageArgument', codageArgument)
          location.replace(uri+'#' + codageArgumentTextArea.value);
        }
      } else {location.reload();}
      autosave = true
      if (developerMode==true) {modal.classList.remove("modal-active")};
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        autosave = true
        if (developerMode==true) {modal.classList.remove("modal-active")};
      }
    }

	function toPNG() {
		const canvas = document.querySelector("#element canvas")
		var ctx = canvas.getContext("2d");
		ctx.globalCompositeOperation = 'destination-over'
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		var image = canvas.toDataURL("image/png")
		var aDownloadLink = document.createElement('a')
		aDownloadLink.download = 'argument-.png'
		aDownloadLink.href = image
		aDownloadLink.click()
	}