function Calculator(options){
  this.$el = options.element;

  this.$form = this.$el.querySelector('[data-selector="form"]');
  this.$ifsplit = this.$el.querySelector('[data-selector="ifsplit"]');
  this.$calc = this.$el.querySelector('[data-selector="calculate"]');

  this.$calc.addEventListener('click', this.processCalc.bind(this));
  this.$ifsplit.addEventListener('change', this.split.bind(this));
}

Calculator.prototype.processCalc = function(event){
  const div;
  let total, tip;
  let l, j = 0;

  let spans = {
    'Total Bill': 0,
    'Tip Amount': 0,
    'smth': 0
  }

  event.preventDefault();

  this.$result = this.$el.querySelector('[data-selector="result"]');
  this.$result.innerHTML = '';

  this.$bill = this.$el.querySelector('[data-selector="bill"]');
  this.$tipPerc = this.$el.querySelector('[data-selector="perc"]');


  total = this.$bill.value * (1 + this.$tipPerc.value / 100);
  total = total.toFixed(2);
  spans['Total Bill'] = total;

  tip = this.$bill.value * this.$tipPerc.value / 100;
  tip = tip.toFixed(2);
  spans['Tip Amount'] = tip;

  div = document.createElement('div');
  div.className = "totals";

  l = 2 * Object.keys(spans).length;
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
      div.appendChild(span);
    }else{
      div.removeChild(div.lastChild);
    }
  }

  






  this.$result.appendChild(div);
  this.$form.reset()

}


Calculator.prototype.split = function(event){
  this.$between = this.$el.querySelector('span[id="between"]');

  if(event.target.checked){
    const span, label, input;

    if(this.$between){
      return;
    }

    span = document.createElement('span');
    span.id = 'between';

    label = document.createElement('label');
    label.textContent = 'Between';

    input = document.createElement('input');
    input.type = "number";
    input.value = 2;

    span.appendChild(label);
    span.appendChild(input);

    this.$form.insertAdjacentElement('beforeend', span);
  }else{
    this.$form.removeChild(this.$between);
  }
}

/*

Calculator.prototype.splitCalc = function(persons,bill,tip){
  billPerPerson = bill / persons;
  tipPerPerson = tip / persons;


}
*/
