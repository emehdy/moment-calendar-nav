//author emehdy@gmail.com 


var Hijri=Hijri||{};
Hijri.picker=function(ele,options){
	
	var $ele=$(ele) ; 
	var self=this;
	self.options=$.extend({},Hijri.picker.options,options||{})
	self.input=($ele.data('input') ? $ele.data('input'):false);
	self.input_format=($ele.data('input-format') ? $ele.data('input-format'):"YYYY-MM-DD");
	 
	self.temp='<div class="date-show"></div><div class="date-container"><h3 class="date"><span data-toggle="datepicker" data-method="subtract" data-type="d" class="fa fa-angle-left"></span><span class="text"></span><span data-toggle="datepicker" data-method="add" data-type="d" class="fa fa-angle-right"></span></h3><h2 class="month"><span data-toggle="datepicker" data-method="subtract" data-type="iMonth" class="fa fa-angle-left"></span><span class="text"></span><span data-toggle="datepicker" data-method="add" data-type="iMonth" class="fa fa-angle-right"></span></h2><h3 class="year"><span data-toggle="datepicker" data-method="subtract" data-type="iYear" class="fa fa-angle-left"></span><span class="text"></span><span data-toggle="datepicker" data-method="add" data-type="iYear" class="fa fa-angle-right"></span></h3></div>';
	if(!$ele.hasClass('initialized'))
	{	
		self.cur_date=moment();
		if(self.input && $(self.input).val())
			self.cur_date=moment($(self.input).val(), self.input_format);
		else if($ele.data('date'))
			self.cur_date=moment($datepicker.data('date'), self.input_format);
		$ele.html(self.temp).addClass('initialized');
		self.bind($ele);
	}
	$ele.on("click", function(event)
	{
		event.stopPropagation();
	});
	
	return this;
}
Hijri.picker.prototype.bind=function($datepicker) 
{
     var cur_date = this.cur_date;
	var self=this;
        function updateDisplay() {   
            if(!$(self.input).val() && !$datepicker.data('date'))return;
			if(self.input)
				$(self.input).val(cur_date.format(self.input_format));
        	$datepicker.find('.date-show').text(cur_date.format('iYYYY-iMM-iDD')); 
			var text={day:[],month:[],year:[]}
			$.each(self.options.format.day,function(i,format){text.day.push(cur_date.format(format))});
            $datepicker.find('.date-container > .date > .text').text(text.day.join(' '));
			$.each(self.options.format.month,function(i,format){text.month.push(cur_date.format(format))});
            $datepicker.find('.date-container > .month > .text').text( text.month.join(' '));
			$.each(self.options.format.year,function(i,format){text.year.push(cur_date.format(format))});
            $datepicker.find('.date-container > .year > .text').text(text.year.join(' '));
            $datepicker.data('date', cur_date.format(self.input_format));
			 
        }
        
        updateDisplay();
        
        $datepicker.find('.date-show').on('click', function(event) {
			$datepicker.data('date', cur_date.format(self.input_format));
			updateDisplay();
			if(!$datepicker.hasClass('opened'))
				$datepicker.addClass('opened');
			else
				$datepicker.removeClass('opened');
		})
        $datepicker.find('[data-toggle="datepicker"]').on('click', function(event) {
            event.preventDefault();
            
            var type = ($(this).data('type') ? $(this).data('type') : "date"),
                method = ($(this).data('method') ? $(this).data('method') : "add"),
                amt = ($(this).data('amt') ? $(this).data('amt') : 1);
                
            if (method == "add") {
                 
				cur_date = cur_date.add(1,type);
            }else if (method == "subtract") {
                cur_date = cur_date.subtract(1,type);
            }
            
            updateDisplay();
        });
        
     
    
}
Hijri.picker.init=function(){
	$(document).click(function() {
		$(".moment-calendar.opened").removeClass('opened');
	});
	$('.moment-calendar').each(function(){new Hijri.picker(this);})
}
Hijri.picker.options={
	format:
	{
		day:['dddd','iDD'],
		month:['iMMMM'],
		year:['iYYYY'],
	}
}
