const string_internals = $ => repeat(choice(
  $.line_single_quote_string_expression,
  $._line_single_quote_string_text,
))

const literals_rules = {
  _literal_constant: $ => choice(
    $.integer_literal,
    $.string_literal,
    $.float_literal,
    $.rune_literal,
    $.boolean_literal,
    $.byte_literal,
    $.unit_literal,
  ),

  integer_literal: $ => seq(
    choice(
      $.binary_literal,
      $.octal_literal,
      $.decimal_literal,
      $.hexadecimal_literal,
    ),
    optional($.integer_literal_suffix),
  ),

  integer_literal_suffix: _ => choice(
    "i8",
    "i16",
    "i32",
    "i64",
    "u8",
    "u16",
    "u32",
    "u64",
  ),

  decimal_literal: _ => prec.right(choice(
    seq(
      /[1-9]/,
      repeat(choice(
        /[0-9]/,
        '_',
      ))
    ),
    '0'
  )),

  decimal_exponent: $ => seq(
    /[eE]/,
    optional(choice('+', '-')),
    $.decimal_fragment,
  ),

  decimal_fragment: _ => prec.right(seq(
    /[0-9]/,
    repeat(choice('_', /[0-9]/)),
  )),

  decimal_fraction: $ => seq(
    '.',
    $.decimal_fragment,
  ),

  collection_literal: $ => $.array_literal,

  array_literal: $ => seq('[', $.array_elements, ']'),

  array_elements: $ => seq($.array_element, repeat(seq(',', $.array_element))),

  array_element: $ => $.expression, // TODO: check prec

  tuple_literal: $ => seq(
    '(',
    $.expression,
    repeat1(seq(',', $.expression)),
    ')'
  ),

  unit_literal: _ => seq('(', ')'),

  string_literal: $ => choice(
    $.line_string_literal,
    $.multi_line_string_literal,
    $.multi_line_raw_string_literal,
  ),

  line_string_literal: $ => seq('"', string_internals($), '"'),

  multi_line_string_literal: $ => choice(
    seq('"""', string_internals($), '"""'),
    seq("'''", string_internals($), "'''"),
  ),

  line_single_quote_string_expression: $ => seq('${', $._expression_or_declaration, '}'),

  _line_single_quote_string_text: $ => choice(
    /[^"\\|\r|\n]/,
    $.escape_seq,
  ),

  multi_line_quote_string_text: $ => seq(
    /[^\\]/,
    $.escape_seq,
  ),

  escape_seq: $ => choice(
    $.unicode_character_literal,
    $.escaped_identifier,
  ),

  unicode_character_literal: $ => seq(
    '\\',
    'u',
    '{',
    $.hexadecimal_digit,
    optional($.hexadecimal_digit),
    optional($.hexadecimal_digit),
    optional($.hexadecimal_digit),
    optional($.hexadecimal_digit),
    optional($.hexadecimal_digit),
    optional($.hexadecimal_digit),
    optional($.hexadecimal_digit),
    '}'
  ),

  escaped_identifier: $ => seq(
    '\\',
    choice('t', 'b', 'r', 'n', "'", '"', '\\', 'f', 'v', '0', '$')
  ),

  multi_line_raw_string_literal: $ => choice(
    seq('#', $.multi_line_raw_string_literal, '#'),
    seq('#', '"', /.*?/, '"', '#'),
    seq('#', "'", /.*?/, "'", '#'),
  ),

  boolean_literal: $ => choice(
    'true',
    'false',
  ),

  byte_literal: $ => seq('b', $.symbol_literal),

  rune_literal: $ => seq('r', $.symbol_literal),

  symbol_literal: $ => choice(
    seq("'", choice($.single_char_byte, $.byte_escape_seq), "'"),
    seq('"', choice($.single_char_byte, $.byte_escape_seq), '"'),
  ),

  single_char_byte: $ => /[\u0000-\u0009\u000B\u000C\u000e-\u0026\u0028-\u005B\u005D-\u007F]/,

  byte_escape_seq: $ => choice(
    $.hex_char_byte,
    $.byte_escaped_identifier,
  ),

  hex_char_byte: $ => seq(
    '\\',
    'u',
    '{',
    choice(
      optional($.hexadecimal_digit),
      $.hexadecimal_digit,
    )
  ),

  byte_escaped_identifier: $ => seq(
    '\\',
    choice('t', 'b', 'r', 'n', "'", '"', '\\', 'f', 'v', '0')
  ),

  float_literal: $ => prec(1, choice(
    seq(
      choice(
        seq($.decimal_literal, $.decimal_exponent),
        // seq($.decimal_fraction, optional($.decimal_exponent)), // TODO: solve conflict
        seq($.decimal_literal, $.decimal_fraction, optional($.decimal_exponent))
      ),
      optional($.float_literal_suffix)
    ),
    seq(
      $.hexadecimal_prefix,
      choice(
        $.hexadecimal_digits,
        $.hexadecimal_fraction,
        seq($.hexadecimal_digits, $.hexadecimal_fraction)
      ),
      $.hexadecial_exponent,
    )
  )),

  float_literal_suffix: _ => choice('f16', 'f32', 'f64'),

  hexadecimal_digits: $ => prec.right(seq(
    $.hexadecimal_digit,
    repeat(choice('_', $.hexadecimal_digit))
  )),

  // regex /[0-9a-fA-F]/ doesn't work here
  hexadecimal_digit: _ => choice(
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f',
    'A', 'B', 'C', 'D', 'E', 'F'
  ),

  hexadecimal_fraction: $ => seq('.', $.hexadecimal_digits),

  hexadecimal_prefix: _ => seq('0', choice('x', 'X')),

  hexadecial_exponent: $ => seq(
    /[pP]/,
    optional(choice('-', '+')),
    $.decimal_fragment
  ),

  hexadecimal_literal: $ => seq('0', choice('x', 'X'), $.hexadecimal_digits),

  binary_literal: $ => prec.right(seq(
    '0', /[bB]/,
    $.binary_digit,
    repeat(choice('_', $.binary_digit))
  )),

  octal_literal: $ => prec.right(seq(
    '0', /[oO]/,
    $.octal_digit,
    repeat(choice('_', $.octal_digit))
  )),

  binary_digit: $ => choice('0', '1'),

  octal_digit: $ => /[0-7]/,
}

module.exports = literals_rules;
