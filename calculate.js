function Calculator(options){
  this.$el = options.element;
  //this.params =

  this.$form = this.$el.querySelector('[data-selector="form"]');
  this.$result = this.$el.querySelector('[data-selector="result"]');
  this.$bill = this.$el.querySelector('[data-selector="bill"]');
  this.$tipPerc = this.$el.querySelector('[data-selector="perc"]');
  this.$calc = this.$el.querySelector('[data-selector="calculate"]');

  this.$calc.addEventListener('click', this.processCalc.bind(this));

}

Calculator.prototype.processCalc = function(event){
    event.preventDefault();
    tip = this.$bill.value * this.$tipPerc.value / 100;
    total = this.$bill.value * (1 + this.$tipPerc.value / 100);

    const div = document.createElement('div');
    div.className = "totals";

    var spanLabel = document.createElement('span');
    var spanValue = document.createElement('span');

    spanLabel.textContent = "Total Bill";
    spanValue.textContent = total;

    div.appendChild(spanLabel);
    div.appendChild(spanValue);

    var spanLabel = document.createElement('span');
    var spanValue = document.createElement('span');

    spanLabel.textContent = "Tip Amount";
    spanValue.textContent = tip;

    div.appendChild(spanLabel);
    div.appendChild(spanValue);

    this.$result.appendChild(div);
  //  this.$form.reset()

    console.log(tip);
    console.log(total);

}
