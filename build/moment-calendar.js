//author emehdy@gmail.com 

var Hijri=Hijri||{};
Hijri.picker=function(ele,options){
	
	var $ele=$(ele) ; 
	var self=this;
	self.options=$.extend({},Hijri.picker.options,options||{})
	self.input=($ele.data('input') && $($ele.data('input')).length ? $($ele.data('input')):false);
	self.readonly=$ele.data('readonly')?true:false
	self.input_format=($ele.data('input-format') ? $ele.data('input-format'):Hijri.picker.options.format.input);
	self.show_format=($ele.data('show-format') ? $ele.data('show-format'):Hijri.picker.options.format.show);
	self.monthes=Hijri.picker.options.monthes||moment.localeData('en')._iMonths; 
	self.temp='<div class="date-show"></div><div class="date-container"><table class="controls" width=100%><tr><td width=80><input type=number class="form-control input-sm"></td><td width=2></td><td width=35><a class="btn btn-default" data-toggle="datepicker" data-method="subtract" data-type="iMonth"><b>-</b></a></td><td width=2></td><td><select class="form-control input-sm"></select></td><td width=2></td><td width=35><a data-toggle="datepicker" data-method="add" data-type="iMonth" class="btn btn-default"><b>+</b></a></td><td width=2></td><td width=35><a class="btn btn-default btn-sm clear"><i class="fa fa-ban"></i></a></td></tr></table><div class="row table-responsive"><table class="table table-bordered calendar"><thead/><tbody/></table></div></div>';
	if(!$ele.hasClass('initialized'))
	{	
		self.cur_date=moment();
		if(self.input && self.input.val())
			self.cur_date=moment(self.input.val(), self.input_format);
		else if($ele.data('date'))
			self.cur_date=moment($ele.data('date'), self.input_format);
			
		
			
		$ele.html(self.temp).addClass('initialized');
		self.month=$ele.find('select');
		self.year=$ele.find('input');
		self.table_head=$ele.find('table.calendar>thead').append('<tr></tr>').find('tr:last');
		self.table=$ele.find('table.calendar>tbody');
		for(var i=0;i<7;i++)
			self.table_head.append($('<th></th>').html( moment().weekday(i).format('ddd') ).css({'text-align':'center'}))
		for(var r=0;r<6;r++)
		{
			var tr=self.table.append('<tr></tr>').find('tr:last');
			for(var i=0;i<7;i++)
			tr.append($('<td></td>').css({'text-align':'center'}).attr('day',(r*7+i)))
		}	
		$.each(self.monthes	,function(x,iMonth){
			 self.month.append(
				$('<option></option>').val(x+1).html(iMonth)
			);
		})
		self.bind($ele);
	}
	$ele.on("click", function(event)
	{
		event.stopPropagation();
		var opened=$ele.hasClass('opened');
		$(".moment-calendar.opened").removeClass('opened');
		if(opened)$ele.addClass('opened');
	});
	
	return this;
}
Hijri.picker.prototype.bind=function($ele) 
{
    var cur_date = this.cur_date;
	var self=this;
        function updateDisplay() {   
            if((self.input && !self.input.val()) && !$ele.data('date'))return;
			if(self.input)
				self.input.val(cur_date.format(self.input_format));
			$ele.find('.date-show').text(cur_date.format(self.show_format)); 
			if(self.readonly)
			{
				$ele.attr('readonly','readonly');
				$ele.find('[data-toggle="datepicker"]').hide();
				self.month.attr('disabled','disabled');
				self.year.attr('readonly','readonly');
				$ele.find('a.clear').attr('disabled','disabled');
			}
        	
			self.month.val(Number(cur_date.format('iM')));
			self.year.val(Number(cur_date.format('iYYYY')));
			self.table.find('td[day],td[set_date]').html('').removeAttr('set_date');
			var start=moment(cur_date).startOf('iMonth');
			var start_wd=start.get('weekday');
			var month_length=moment.iDaysInMonth(Number(cur_date.format('iYYYY')), Number(cur_date.format('iM')))

			for(var d=start_wd;d<month_length+start_wd;d++)
				self.table.find('td[day='+d+']').html(d-start_wd+1)
				.attr('set_date',moment(start).add(d-start_wd,'d').format('YYYY-MM-DD') )
				.on('click', changeDate);
			if(start_wd==6 && month_length>29) 
				self.table.find('tr:last').show();
			else
				self.table.find('tr:last').hide();
        }
        function changeDate(event) 
		{
			cur_date=moment($(this).attr('set_date'));
			$ele.removeClass('opened');
			if(self.input)
				self.input.val(cur_date.format(self.input_format));
			$ele.find('.date-show').text(cur_date.format(self.show_format));
		}
        updateDisplay();
        
        $ele.find('.date-show').on('click', function(event) {
			$ele.data('date', cur_date.format(self.input_format));
			updateDisplay();
			if(!$ele.hasClass('opened'))
				$ele.addClass('opened');
			else
				$ele.removeClass('opened');
		})
        self.year.on('change', function(event) {
			if(Number(this.value)>1356 && Number(this.value)<1500)
				cur_date.iYear(Number(this.value));
			 updateDisplay();
		});
		self.month.on('change', function(event) {
			if(Number(this.value))
				cur_date.iMonth(Number($(this).val())-1);
			 updateDisplay();
		});
        
        $ele.find('a.clear').on('click', function(event) {
			if(self.readonly)return
			cur_date=moment();
			$ele.removeClass('opened');
			if(self.input)
				self.input.val('');
			$ele.find('.date-show').text('');
		})
        $ele.find('[data-toggle="datepicker"]').on('click', function(event) {
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
	monthes:unescape("%u0645%u062D%u0631%u0651%u0645%7C%u0635%u0641%u0631%7C%u0631%u0628%u064A%u0639%20%u0627%u0644%u0623%u0648%u0644%7C%u0631%u0628%u064A%u0639%20%u0627%u0644%u0622%u062E%u0631%7C%u062C%u0645%u0627%u062F%u0649%20%u0627%u0644%u0623%u0648%u0644%u0649%7C%u062C%u0645%u0627%u062F%u0649%20%u0627%u0644%u0622%u062E%u0631%u0629%7C%u0631%u062C%u0628%7C%u0634%u0639%u0628%u0627%u0646%7C%u0631%u0645%u0636%u0627%u0646%7C%u0634%u0648%u0627%u0644%7C%u0630%u0648%20%u0627%u0644%u0642%u0639%u062F%u0629%7C%u0630%u0648%20%u0627%u0644%u062D%u062C%u0629").split('|') ,
	format:
	{
		show:'iYYYY-iMM-iDD',
		input:'YYYYMMDD',
	}
}
