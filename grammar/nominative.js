const nominative = ($, kind, modifier, body) => seq(
  repeat(modifier),
  kind,
  $.identifier, 
  optional($.type_parameters),
  optional(seq('<:', $.supertypes)),
  optional($.generic_constraints),
  body
)

const nominative_rules = {
  class_declaration: $ => nominative($, 'class', $.class_modifier, $.class_body),
  interface_declaration: $ => nominative($, 'interface', $.interface_modifier, $.interface_body),
  enum_declaration: $ => nominative($, 'enum', $.enum_modifier, $.enum_body),
  struct_declaration: $ => nominative($, 'struct', $.struct_modifier, $.struct_body),

  class_body: $ => seq('{', repeat($.nominative_member), '}'),

  nominative_member: $ => seq(
    optional($.annotations),
    choice(
      $.nominative_init,
      $.static_init,
      $.class_finilizer,
      $.variable_declaration,
      $.function_declaration,
      $.property_declaration,
      $.nominative_primary_init,
    // $.macro_expression, // TODO: uncomment
  )),

  nominative_init: $ => seq(
    repeat($.nominative_member_modifier),
    choice('init', $.identifier),
    $.function_parameters,
    $.block
  ),

  static_init: $ => seq(
    'static',
    'init',
    '(',
    ')',
    $.block
  ),

  class_finilizer: $ => seq('~', 'init', '(', ')', $.block),

  interface_body: $ => seq('{', repeat($.interface_member), '}'),

  interface_member: $ => seq(
    optional($.annotations),
    $.function_declaration,
  ),

  enum_body: $ => seq(
    '{',
    optional('|'), $.enum_constructor,
    repeat(seq('|', $.enum_constructor)),
    repeat($.enum_member),
    '}'
  ),

  enum_constructor: $ => seq(
    optional($.annotations),
    $.identifier,
    optional(seq('(', $.type, repeat(seq(',', $.type)) ,')'))
  ),

  enum_member: $ => seq(
    optional($.annotations),
    choice(
      $.function_declaration,
      $.property_declaration,
      // $.macro_expression, // TODO: uncomment
  )),

  struct_body: $ => seq('{', repeat($.nominative_member), '}'),

  nominative_primary_init: $ => seq(
    optional($.nominative_member_modifier),
    $.identifier,
    '(',
    optional($.primary_init_params),
    ')',
    $.block,
  ),

  primary_init_params: $ => seq(
    $.primary_init_param,
    repeat(seq(',', $.primary_init_param)),
  ),

  primary_init_param: $ => seq(
    optional($.nominative_member_modifier),
    choice('let', 'var'),
    $.identifier,
    optional('!'),
    ":",
    $.type,
    optional(seq('=', $.expression)),
  ),
}

module.exports = nominative_rules;
