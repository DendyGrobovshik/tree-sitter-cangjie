const PREC = {
  FLOW: 1,
  COALESCING: 2,
}

const expression_rules = {
  expression: $ => choice(
    $.atomic_expression,
    $.binary_expression,
  ),

  binary_expression: $ => choice(
    $.flow_expression,
    $.coalescing_expression,
  ),

  flow_expression: $ => prec.right(PREC.FLOW, seq($.expression, choice('->', '|>'), $.expression)),
  coalescing_expression: $ => prec.right(PREC.COALESCING, seq($.expression, choice('??'), $.expression)),
}

module.exports = expression_rules;
