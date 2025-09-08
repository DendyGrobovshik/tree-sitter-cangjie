const modifiers_rules = {
  package_modifier: $ => choice(
    'public',
    'protected',
    'internal',
  ),

  import_modifier: $ => choice(
    'public',
    'protected',
    'internal',
    'private',
  ),

  _declaration_access_modifier: $ => choice(
    'public',
    'protected',
    'internal',
    'private',
  ),

  _open_modifier: $ => 'open',

  variable_modifier: $ => choice(
    $._declaration_access_modifier,
    'static',
  ),

  type_modifier: $ => $._declaration_access_modifier,

  function_modifier: $ => choice(
    $._declaration_access_modifier,
    $._open_modifier,
    'static',
    'override',
    'abstract',
    'operator',
    'redef',
    'mut',
    'unsafe',
    'const',
  ),

  property_modifier: $ => choice(
    $._declaration_access_modifier,
    $._open_modifier,
    'static',
    'override',
    'abstract',
    'redef',
    'mut',
  ),

  class_modifier: $ => choice(
    $._declaration_access_modifier,
    'abstract',
    $._open_modifier,
    'sealed',
  ),

  class_member_modifier: $ => choice(
    $._declaration_access_modifier,
    'const',
  ),

  interface_modifier: $ => choice(
    $._declaration_access_modifier,
    $._open_modifier,
  ),

  enum_modifier: $ => $._declaration_access_modifier,
}

module.exports = modifiers_rules;
