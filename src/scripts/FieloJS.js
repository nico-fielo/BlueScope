$(document).ready(function(){
	$('.F_NationalIdContactAddress__c input').addClass('sameAdress');	
	$('.sameAdress').on('click',function(){
		if($(this).is(':checked')){
			$('.ContactAddress .FieloEE__Street__c input').val($('.F_NationalId_Address__c input').val());
			$('.ContactAddress .FieloEE__City__c input').val($('.F_NationalId_City__c input').val());
			$('.ContactAddress .FieloEE__ZipCode__c input').val($('.F_NationalId_PostCode__c input').val());
			$('.ContactAddress .F_State__c select').val($('.F_NationalId_State__c select').val());
			$('.ContactAddress .F_District__c input').val($('.F_NationalId_District__c input').val());
			$('.ContactAddress .F_Country__c select').val($('.F_NationalId_Country__c select').val());
			$('.ContactAddress .FieloEE__Phone__c input').val($('.F_NationalId_Phone__c input').val());
			$('.ContactAddress .FieloEE__Street__c input').attr('disabled' , true)
			$('.ContactAddress .FieloEE__City__c input').attr('disabled' , true)
			$('.ContactAddress .FieloEE__ZipCode__c input').attr('disabled' , true)
			$('.ContactAddress .F_State__c select').attr('disabled' , true)
			$('.ContactAddress .F_District__c input').attr('disabled' , true)
			$('.ContactAddress .F_Country__c select').attr('disabled' , true)
			$('.ContactAddress .FieloEE__Phone__c input').attr('disabled' , true)
		}else{
			$('.ContactAddress input, .ContactAddress select').val('');
			$('.ContactAddress input, .ContactAddress select').attr('disabled' , false)
		}
	});
	invertLabels();
})

function invertLabels(){
	var checkbox = $( "[type=checkbox]" );
	$.each(checkbox, function(){
		$(this).addClass('inline checkbox').parents('.control-group').find('.control-label')
			.appendTo($(this).parents('.controls')).removeClass('control-label').addClass('inline');
		
	})
};