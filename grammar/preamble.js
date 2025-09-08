const preamble_rules = {
  // NOTE: this may match empty, so it's inluned in top rule. Instead another version can be used. 
  // preamble: $ => seq(choice(seq($.package_header, repeat($.import_list)),
  //   seq(optional($.package_header), repeat1($.import_list)))),
  preamble: $ => seq(
    optional($.package_header),
    repeat($.import_list)
  ),

  package_header: $ => seq(
    optional($.package_modifier),
    optional('macro'),
    'package',
    $.fq_identifier,
  ),

  import_list: $ => seq(
    optional($.import_modifier),
    'import',
    $.import,
  ),

  import: $ => choice(
    $.single_import,
    $.multi_import,
  ),

  single_import: $ => choice(
    $.qualified_import,
    $.alias_import,
    $.all_import,
  ),

  qualified_import: $ => $.fq_identifier,

  alias_import: $ => seq(
    $.qualified_import,
    'as',
    $.identifier,
  ),

  all_import: $ => seq(
    $.fq_identifier,
    // '.',
    '.*'
    // /[\.\*]/,
  ),

  multi_import: $ => seq(
    $.fq_identifier,
    '{',
    $.single_import, repeat(seq(',', $.single_import)),
    '}'
  )
}

module.exports = preamble_rules;
