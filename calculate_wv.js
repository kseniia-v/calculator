function Calculator(options){
  this.$el = options.element;

  this.$form = this.$el.querySelector('[data-selector="form"]');
  this.$ifsplit = this.$el.querySelector('[data-selector="ifsplit"]');
  this.$calc = this.$el.querySelector('[data-selector="calculate"]');

  this.$calc.addEventListener('click', this.processCalc.bind(this));
  this.$ifsplit.addEventListener('change', this.split.bind(this));
}

Calculator.prototype.split = function(event){
  this.$between = this.$el.querySelector('span[id="between"]');
  this.$split = this.$el.querySelector('div[id="split"]');

  if(event.target.checked){
    let span, label, input;

    if(this.$between){
      return;
    }

    span = document.createElement('span');
    span.id = 'between';

    label = document.createElement('label');
    label.textContent = 'Between';

    input = document.createElement('input');
    input.name = "split";
    input.type = "number";
    input.value = 2;

    span.appendChild(label);
    span.appendChild(input);

    this.$split.insertAdjacentElement('beforeend', span);
  }else{
    this.$split.removeChild(this.$between);
  }
}

Calculator.prototype.processCalc = function(event){
  let result, total, tip;

  let vals = {
    'Total Bill': null,
    'Tip Amount': null,
  }

  event.preventDefault();

  this.$result = this.$el.querySelector('div[id="result"]');
  if(this.$result){
    this.$el.removeChild(this.$result);
  }

  this.$bill = this.$el.querySelector('[data-selector="bill"]');
  this.$tipPerc = this.$el.querySelector('[data-selector="perc"]');

  total = this.$bill.value * (1 + this.$tipPerc.value / 100);
  total = total.toFixed(2);
  vals['Total Bill'] = total;

  tip = this.$bill.value * this.$tipPerc.value / 100;
  tip = tip.toFixed(2);
  vals['Tip Amount'] = tip;

  result = document.createElement('div');
  result.id = "result";
  result.className = "totals";
  this.show(result,vals);

  if(this.$ifsplit.checked){
    this.$split = this.$el.querySelector('input[name="split"]');
    let persons = this.$split.value;
    pperson=this.splitCalc(persons,total,tip,vals);
    result.appendChild(pperson);
  }

  this.$el.appendChild(result);

}






Calculator.prototype.splitCalc = function(persons,bill,tip,args){
    let billPerPerson = bill / persons;
    let tipPerPerson = tip / persons;

    let pperson = document.createElement('div');
    pperson.id = "perperson";

    let p = document.createElement('p');
    p.textContent = 'Per Person';

    args['Total Bill'] = billPerPerson;
    args['Tip Amount'] = tipPerPerson;

    pperson.appendChild(p);
    this.show(pperson,args);

    return pperson;

}


Calculator.prototype.show = function(elem,args){
  let l, j = 0;
  l = 2 * Object.keys(args).length;
  for (let i = 0; i < l; i++){
    if(i % 2 == 0){
      var text = Object.keys(args)[i/2];
    }else{
      j++;
      var text = Object.values(args)[i-j];
    }

    if (text || text === 0){
      let div = document.createElement('div');
      div.textContent = text;
      elem.appendChild(div);
    }else{
      elem.removeChild(elem.lastChild);
    }
  }
}
