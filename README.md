# moment-calendar-nav


supports Hijri Date based on [moment-hijri](https://github.com/xsoh/moment-hijri) library.
A Hijri (Based on Umm al-Qura calculations) calendar system plugin for moment.js.
checkout the Boxed version  on [moment-calendar](https://github.com/emehdy/moment-calendar) .

About
-----

Hijri is the Islamic lunar calendar used by Muslims everywhere to determine the proper days on which to observe the annual fasting, to attend Hajj, and to celebrate other Islamic holidays and festivals [more info at wiki](https://en.wikipedia.org/wiki/Islamic_calendar).

This plugin adds Hijri calendar HTML preview support to [moment-hijri](https://github.com/xsoh/moment-hijri) library and [momentjs](http://momentjs.com) library.

Calendar conversion is based on the [Umm al-Qura calculations](http://www.ummulqura.org.sa/).

Shows advanced datepicker for Hijri Calendar based on Umm al-Qura

requires JQuery , Bootstrap , MomentJS , hijri-moment ,Font-awesome 


Demo
-----

include javascritpt files 
JQuery
MomentJS
hijri-moment.js
moment-calendar.js

and CSS files 
font-awesome
Bootstrap
moment-calendar.css

![alt tag](https://raw.githubusercontent.com/emehdy/moment-calendar-nav/master/demo/demo.jpg)


check demo/index.html file 

### General output format config

```js
Hijri.picker.options={
	format:
	{
		day:['dddd','iDD'],
		month:['iMMMM'],
		year:['iYYYY'],
		input:'YYYYMMDD',
	}
}
```

### HTML usage
####attr: data-input
is jquery selector to point the target of this picker
####attr: data-input-format
is a moment format to override Hijri.picker.options.format.input when read and write from the input
####attr: data-readonly
to show a readonly date component

```HTML

<div class="col-sm-6">  
<input type="hidden" id="dateinput3"  value="1400-09-23">
<span class="moment-calendar" data-readonly='readonly' data-input='#dateinput3' data-input-format='iYYYY-iMM-iDD'  ></span>
</div>
```
