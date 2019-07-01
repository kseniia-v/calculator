function Calculator(options){
  this.$el = options.element;

  this.$form = this.$el.querySelector('[data-selector="form"]');
  this.$result = this.$el.querySelector('[data-selector="result"]');
  this.$bill = this.$el.querySelector('[data-selector="bill"]');
  this.$tipPerc = this.$el.querySelector('[data-selector="perc"]');
  this.$calc = this.$el.querySelector('[data-selector="calculate"]');

  this.$calc.addEventListener('click', this.processCalc.bind(this));

}

Calculator.prototype.processCalc = function(event){
  event.preventDefault();
  this.$result.innerHTML = '';

  let total, tip;

  let spans = {
    'Total Bill': 0,
    'Tip Amount': 0,
    'smth': 0
  }

  total = this.$bill.value * (1 + this.$tipPerc.value / 100);
  total = total.toFixed(2);
  spans['Total Bill'] = total;

  tip = this.$bill.value * this.$tipPerc.value / 100;
  tip = tip.toFixed(2);
  spans['Tip Amount'] = tip;

  const div = document.createElement('div');
  div.className = "totals";

  let l = 2 * Object.keys(spans).length;

  let j = 0;
  for (let i = 0; i < l; i++){
    let span = document.createElement('span');

    if(i % 2 == 0){
      var text = Object.keys(spans)[i/2];
    }else{
      j++;
      var text = Object.values(spans)[i-j];
    }

    if (text){
      let span = document.createElement('span');
      span.textContent = text;
      span.id = i;
      div.appendChild(span);
    }else{
      let span = document.getElementById(i-1);

      const elem = document.createElement(span);
      console.log(i-1);
      console.log(elem);
    //  div.removeChild(elem);
    }




  }




  this.$result.appendChild(div);
  this.$form.reset()



}
