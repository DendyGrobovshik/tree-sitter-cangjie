const { identifier } = require("./common");

const PREC = {
  FLOW: 1,
  COALESCING: 2,
  LOGIC_DISJUNCTION: 3,
  LOGIC_CONJUNCTION: 4,
  RANGE: 5,
  BITWISE_DISJUNCTION: 6,
  BITWISE_XOR: 7,
  BITWISE_CONJUNCTION: 8,
  EQUALITY_COMPARISION: 9,
  COMPARISION: 10,
  TYPE_CHECK: 11,
  SHIFTING_EXPRESSION: 12,
  ADDITIVE_EXPRESSION: 13,
  MULTIPLICATIVE_EXPRESSION: 14,
  EXPONENT_EXPRESSION: 15,

  PREFIX: 16,
  INC_AND_DEC: 17,
  POSTFIX: 17,
}

const expression_rules = {
  expression: $ => choice(
    $.assignment_expression,
    $._binary_expression,
  ),

  assignment_expression: $ => seq(
    choice(
      $.left_value,
      '_',
    ),
    $.assign_operator,
    $.expression,
  ),

  assign_operator: _ => token(seq(
    optional(choice('+', '-', '*', '**', '/', '%', '&&', '||', '&', '|', '^', '<<', '>>')),
    '='
  )),

  left_value: $ => seq(
    $.left_aux_expression,
    optional('?'),
    optional($.assignable_suffix),
  ),

  assignable_suffix: $ => choice(
    $.index_access,
    $.field_access,
  ),

  left_aux_expression: $ => choice(
    seq($.identifier, optional($.type_arguments)),
    $.type,
    'this',
    'super',
    // seq($.left_aux_expression, optional('?'), choice(
    //   prec.right(seq('.', $.identifier, optional($.type))),
    //   $.call_suffix,
    //   $.index_access,
    // )),
    // $.tuple_left_value_expression,
  ),

  tuple_left_value_expression: $ => seq(
    '(',
    $.left_aux_expression,
    repeat(seq(',', $.left_aux_expression)),
    ')',
  ),

  _binary_expression: $ => choice(
    $.flow_expression,
    $.coalescing_expression,
    $.logic_disjunction_expression,
    $.logic_conjunction_expression,
    $.range_expression,
    $.bitwise_disjunction_expresion,
    $.bitwise_xor_expression,
    $.bitwise_conjunction_expression,
    $.equality_comparision_expression,
    $.comparision_expression,
    $.type_check_expression,
    $.shifting_expression,
    $.additive_expression,
    $.multiplicative_expresion,
    $.exponent_expression,
    $._non_binary,
  ),

  flow_expression: $ => prec.right(PREC.FLOW, seq($._binary_expression, choice('->', '|>'), $._binary_expression)),
  coalescing_expression: $ => prec.right(PREC.COALESCING, seq($._binary_expression, '??', $._binary_expression)),
  logic_disjunction_expression: $ => prec.right(PREC.LOGIC_DISJUNCTION, seq($._binary_expression, '||', $._binary_expression)),
  logic_conjunction_expression: $ => prec.right(PREC.LOGIC_CONJUNCTION, seq($._binary_expression, '&&', $._binary_expression)),
  range_expression: $ => prec.right(PREC.RANGE, 
    seq($._binary_expression, choice('..', '..='), $._binary_expression, optional(seq(':', $._binary_expression)))),
  bitwise_disjunction_expresion: $ => prec.right(PREC.BITWISE_DISJUNCTION, seq($._binary_expression, '|', $._binary_expression)),
  bitwise_xor_expression: $ => prec.right(PREC.BITWISE_XOR, seq($._binary_expression, '^', $._binary_expression)),
  bitwise_conjunction_expression: $ => prec.right(PREC.BITWISE_CONJUNCTION, seq($._binary_expression, '&', $._binary_expression)),
  equality_comparision_expression: $ => prec.right(PREC.EQUALITY_COMPARISION,
    seq($._binary_expression, choice('==', '!='), $._binary_expression)),
  comparision_expression: $ => prec.right(PREC.COMPARISION,
    seq($._binary_expression, choice('<', '<=', '>=', '>'), $._binary_expression)),
  type_check_expression: $ => prec.right(PREC.TYPE_CHECK, seq($._binary_expression, choice('as', 'is'), $._binary_expression)),
  shifting_expression: $ => prec.right(PREC.SHIFTING_EXPRESSION, seq($._binary_expression, choice('<<', '>>'), $._binary_expression)),
  additive_expression: $ => prec.left(PREC.ADDITIVE_EXPRESSION, seq($._binary_expression, choice('+', '-'), $._binary_expression)),
  multiplicative_expresion: $ => prec.left(PREC.MULTIPLICATIVE_EXPRESSION,
    seq($._binary_expression, choice('*', '/'), $._binary_expression)),
  exponent_expression: $ => prec.right(PREC.EXPONENT_EXPRESSION, seq($._binary_expression, '**', $._binary_expression)),

  _non_binary: $ => prec.right(PREC.EXPONENT_EXPRESSION + 1, $._unary_expression),

  _unary_expression: $ => choice(
    $.prefix_expression,
    $.inc_and_dec_expression,
    $.postfix_expression,
  ),

  prefix_expression: $ => prec(PREC.PREFIX, seq(repeat1(choice('-', '!')), $._unary_expression)),
  inc_and_dec_expression: $ => prec(PREC.INC_AND_DEC, seq($._unary_expression, choice('--', '++'))),

  postfix_expression: $ => prec.right(PREC.POSTFIX, choice(
    $.atomic_expression,
    seq($.type, '.', $.identifier),
    field("before_dot", seq($.postfix_expression, '.', $.identifier, optional($.type_arguments))),
    field("before_call", seq($.postfix_expression, $.call_suffix)),
    seq($.type, $.call_suffix), // let x = UInt32(0)
    // $.b,
    // $.a,
    
    seq($.postfix_expression, $.index_access),
    // seq($.postfix_expression, '.', $.identifier, optional($.call_suffix), $.trailing_lambda_expression),
    // seq($.identifier, optional($.call_suffix), $.trailing_lambda_expression),
    // TODO: command below can cause infinite loop for
    // func f() { return 1 }
    // seq($.postfix_expression, repeat(seq('?', $.quest_separated_items))),
  )),

  // a: $ => seq($.atomic_expression),
  // b: $ => seq($.atomic_expression, $.call_suffix),

  call_suffix: $ => seq('(', optional(seq($.value_argument, repeat(seq(',', $.value_argument)))), ')'),

  value_argument: $ => choice(
    seq($.identifier, ':', $.expression),
    $.expression,
    $.ref_transfer_expression,
  ),

  ref_transfer_expression: $ => seq('inout', optional(seq($.expression, '.')), $.identifier),

  index_access: $ => seq('[', choice($.expression, $.range_element), ']'),

  field_access: $ => seq('.', $.identifier),

  range_element: $ => choice(
    '..',
    seq(choice('..', '..='), $.expression),
    seq($.expression, '..'),
  ),

  quest_separated_items: $ => prec.right(repeat1($.quest_separated_item)),

  quest_separated_item: $ => prec.right(seq(
    $.item_after_quest,
    optional(choice(
      $.call_suffix, 
      seq(optional($.call_suffix), $.trailing_lambda_expression),
      $.index_access,
    ))
  )),

  item_after_quest: $ => prec.right(choice(
    seq('.', $.identifier, optional($.type_arguments)),
    $.call_suffix,
    $.index_access,
    $.trailing_lambda_expression,
  )),
}

module.exports = expression_rules;
