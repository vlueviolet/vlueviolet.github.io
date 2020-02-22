/**
 * 로딩바
 */
var ProcessSpinner = function () {}
ProcessSpinner.prototype = {
 show: function() {
  $('#process-spinner').show();
 },
 hide: function() {
  $('#process-spinner').hide();
 }
}