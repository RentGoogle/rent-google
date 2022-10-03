$( document ).ready(function() {

	/* navigation */

	$(".top-button, .top-bars, .step-1 strong").click(function() {
		$("body, html").animate({scrollTop:$(".form").offset().top - $(".top").outerHeight() + 40}, 1300, "easeInOutExpo");
	});
	
	$("#m1").click(function() {
		$("body, html").animate({scrollTop:$(".reasons").offset().top - $(".top").outerHeight()}, 1300, "easeInOutExpo");
	});
	$("#m2").click(function() {
		$("body, html").animate({scrollTop:$(".steps").offset().top - $(".top").outerHeight() + 1}, 1300, "easeInOutExpo");
	});
	$("#m3").click(function() {
		$("body, html").animate({scrollTop:$(".h2-safe").offset().top - $(".top").outerHeight()-40}, 1300, "easeInOutExpo");
	});	
	
	/* slider */

	$(".opinions-blocks").lightSlider({
		autoWidth:true,
		speed:500,
		slideMargin:12,
		loop:false,
		controls:false,
		pager:false
	});

	/* form */

	$("input").on("input keyup", function(e) {

		let $input = $(this);

		let code = e.keyCode || e.which;

		if ($input.val() != "") {
			$input.removeClass("error");
		} else {
			if (code != "9") {
				$input.addClass("error");
			}
		}

	});

	$(".main-form").submit(function(event) {

		event.preventDefault();

		let $form = $(this);

		let name = $form.find("input[name='name']").val();
		let phone = $form.find("input[name='phone']").val();
		let messanger = $form.find("select[name='messanger']").val();


		if (name == "") {
			$form.find("input[name='name']").addClass("error");
		}

		if (phone == "") {
			$form.find("input[name='phone']").addClass("error");
		}

		if (name != "" && phone != "") {
			$(".success-block").fadeIn(300);

			let url = "send.php";
			let data = {'name':name, 'phone':phone, 'messanger':messanger};


			$.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function (data) {

					if(data.status == 'success') {
						$(".success-block").fadeIn(300);
						$form.find("input[name='name']").val("");
						$form.find("input[name='phone']").val("");
						$form.find("select[name='messanger']").val("whatsapp-messenger");
                      if(fbq) {
                        fbq('track', 'CompleteRegistration',{value:1.00,currency:'USD'});
                        console.log('CompleteRegistration');
                      } else {
                         console.error('CompleteRegistration error');
                      }
                      
					} else {
						$form.find("input.error:eq(0)").focus();
					}

					$(".preloader").fadeOut(300);
					$(".success-message").fadeIn(300);
				}.bind($form),
				dataType: 'JSON'
			});


		} else {
			$form.find("input.error:eq(0)").focus();
		}


		return false;
    });

    /* close window */

    $(".close-button").click(function() {
    	
    	$(".success-block").fadeOut(300);

    	setTimeout(function() {
    		$(".success-message").hide();
    		$(".preloader").show();
    	}, 300);

    });

	/*

	function doGet(e){

		let sheet = SpreadsheetApp.openById("1CCiVf_pw2_CczoR7eMPXSEUyzFzdB37JCZj634zeYrM");
		let newRow = sheet.getLastRow()+1;
		let now = new Date();
		let date = addZero(now.getFullYear()) + "-" + addZero(now.getMonth()) + "-" + addZero(now.getDate()) + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

		sheet.getRange("A"+newRow).setValue(date);
		sheet.getRange("B"+newRow).setValue(e.parameter.p1);
		sheet.getRange("C"+newRow).setValue(e.parameter.p2);
		sheet.getRange("D"+newRow).setValue(e.parameter.p3);
		sheet.getRange("E"+newRow).setValue(e.parameter.p4);

	}

	function addZero(num) {
		if (num >= 0 && num <= 9) {
			return '0' + num;
		} else {
			return num;
		}
	}

	*/
	
});