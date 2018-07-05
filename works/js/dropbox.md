```javascript
/**
 * 드롭다운 공통 컴포넌트
 */
var CommDropdown = function (container, args, callback) {
	this.label = null;
	this.value = null;
	this.container = container || '.dropdown';
	this.callback = callback || null;
	
	if (args) {
		this.label = args.label || null;
		this.value = args.value || null;
		this.callback = args.callback || null;
	}
	
	return this.init();
};

CommDropdown.prototype = {
	init: function () {
		this.labelEl = $(this.container).find('.dropdown-toggle span');
		this.listEl = $(this.container).find('.dropdown-menu');
		this.bindEvent();
		return this;
	},
	
	bindEvent: function () {
		$(this.container).off('click', '.dropdown-item');
		$(this.container).on('click', '.dropdown-item', $.proxy(this.itemSelectEvent, this));
	},
	
	itemSelectEvent: function (e) {
		e.preventDefault();
        var $target = $(e.currentTarget);
		this.label = $target.data('label');
		this.value = $target.data('value');
		
		if(!this.label || !this.value) {
			console.error('data-label, data-value attribute를 세팅해주세요.');
			return false;
		}
		
		this.labelEl.text(this.label);
		if (typeof this.callback === 'function') {
			this.callback(this.label, this.value, $target);
		}
	}
};



/**
 * 별도 기능없이 작동하는 경우에만 여기에 선언한다.
 */
$(function() {

/**
 * Dropdow 컴포넌트
 * 
 * 
 * ====================	1) 추가 처리가 필요한경우
 *	var dropdown = new CommDropdown('.dropdown', null, function (label, value, target) {
 *		console.log('callback..', label, value, target);
 *	});
 * ====================	2) selector
 *	var dropdown = new CommDropdown('.dropdown');
 * 
 */
//	var dropdown = new CommDropdown();
	 
});
```
