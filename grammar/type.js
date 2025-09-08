const type_rules = {
  type: $ => choice(
    $.atomic_type,
    $.parenthesized_type,
    $.tuple_type,
    $.prefix_type,
    $.function_type,
    $.composite_type,
    // TODO: list other types
  ),

  atomic_type: $ => choice(
    'Int8',
    'Int16',
    'Int32',
    'Int64',
    'IntNative',
    'UInt8',
    'UInt16',
    'UInt32',
    'UInt64',
    'UIntNative',
    'Float16',
    'Float32',
    'Float64',
    
    'Rune',
    'Bool',
    'Nothing',
    'Unit',
    'This',
  ),

  parenthesized_type: $ => seq('(', $.type, ')'),

  tuple_type: $ => seq(
    '(',
    $.type,
    repeat1(seq(',', $.type)),
    ')'
  ),

  prefix_type: $ => seq('?', $.type),

  function_type: $ => seq($.parameter_type, '->', $.type),

  // TODO: spec also have named type parameters
  parameter_type: $ => seq(
    '(',
    optional(seq(
      $.type,
      repeat(seq(',', $.type))
    )),
    ')'
  ),

  composite_type: $ => seq(
    $.fq_identifier,
    repeat($.type_arguments),
  ),

  type_arguments: $ => seq('<', $.type, repeat(seq(',', $.type)), '>'),

  type_parameters: $ => seq('<', $.identifier, repeat(seq(',', $.identifier)), '>'),

  generic_constraints: $ => seq(
    'where',
    $.generic_constraint,
    repeat(seq(',', $.generic_constraint))
  ),

  generic_constraint: $ => seq(choice($.identifier, 'This'), '<:', $.supertypes),

  supertypes: $ => seq($.type, repeat(seq('&', $.type))),
}

module.exports = type_rules;
