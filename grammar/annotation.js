const annotation_rules = {
  annotations: $ => repeat1($.annotation),

  annotation: $ => seq('@', $.fq_identifier, '[', $.annotation_arguments, ']'),

  annotation_arguments: $ => seq($.annotation_argument, repeat(seq(',', $.annotation_argument))),

  annotation_argument: $ => choice(
    $.expression,
    seq($.identifier, ':', $.expression),
  ),
}


module.exports = annotation_rules;
