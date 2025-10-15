; update functions -> methods
; varibles -> fields
; see: https://github.com/nvim-treesitter/nvim-treesitter/blob/master/CONTRIBUTING.md

(ERROR) @error-node

[
 "package"

 "prop"
 "let"
 "var"
 "const"

 "foreign"

 "where"
] @keyword

[
 "class"
 "interface"
 "struct"
 "enum"
 "type"
 "extend"
] @keyword.type

[
 "try"
 "throw"
 "catch"
 "finally"
] @keyword.exception

"func" @keyword.function

[
  "spawn"
  "synchronized"
] @keyword.coroutine

[
  "="
  "->"
  "|>"
  "??"
  "||"
  "&&"
  ".."
  "..="
  "|"
  "^"
  "&"
  "=="
  "!="
  "<"
  "<="
  ">="
  ">"
  "as"
  "is"
  "<<"
  ">>"
  "+"
  "-"
  "*"
  "/"
  "**"
  "in"
  "=>"
  "<:"
  "@"
] @keyword.operator

(assign_operator) @keyword.operator

[
  "case"
  "match"
  "if"
  "else"
] @keyword.conditional

[
  "for"
  "while"
  "do"
] @keyword.repeat

"import" @keyword.import

[
 "public"
 "protected"
 "internal"
 "private"

 "static"

 "abstract"
 "open"
 "sealed"
 "mut"

 "override"
 "redef"
] @keyword.modifier

[
  "return"
  "break"
  "continue"
] @keyword.return

[
  "super"
] @function.builtin

(property_body_member "get" @function.builtin)
(property_body_member "set" @function.builtin)

[
  "init"
] @constructor
(enum_constructor (identifier) @constructor)
(enum_pattern_constructor (identifier) @constructor)
(capital) @constructor

(variable_declaration (patterns_maybe_irrefutable (var_binding_pattern (identifier) @variable.member)))
[
  "this"
] @variable.builtin
(left_value (left_aux_expression "this")
 (assignable_suffix (field_access (identifier) @variable.member)))

[
 (line_comment)
 (multiline_comment)
] @comment

[
  (integer_literal)
] @number

[
  "["
  "]"
  "{"
  "}"
  "("
  ")"
] @punctuation.bracket

[
  "true"
  "false"
] @boolean

[
  ","
] @punctuation.delimiter

(function_declaration (identifier) @function)
(nominative_primary_init (identifier) @function)
(function_parameter (identifier) @variable.parameter)
(primary_init_param (identifier) @variable.parameter)
(function_parameter ("_") @variable.parameter.builtin)

(postfix_expression
          (postfix_expression
            (atomic_expression
              (identifier) @function.call))
          (call_suffix))

(type (atomic_type) @type.builtin)
(type (composite_type (fq_identifier (identifier) @type)))
(type_parameters (identifier) @type)
(prefix_type ("?") @type.builtin)

(type_alias_declaration (identifier) @type.definition)
(class_declaration (identifier) @type.definition)
(struct_declaration (identifier) @type.definition)
(enum_declaration (identifier) @type.definition)
(interface_declaration (identifier) @type.definition)

(string_literal) @string

; Can highlighting inside string interpolation be enhanced?
(line_single_quote_string_expression (_ (identifier) @variable))
(line_single_quote_string_expression (_ (_ (identifier) @variable)))
(line_single_quote_string_expression (_ (_ (_ (identifier) @variable))))
(line_single_quote_string_expression (_ (_ (_ (_ (identifier) @variable)))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (identifier) @variable))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (identifier) @variable)))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (identifier) @variable))))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @variable)))))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @variable))))))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @variable)))))))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @variable))))))))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @variable)))))))))))))
(line_single_quote_string_expression (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @variable))))))))))))))


(package_header (fq_identifier (identifier) @module))

(line_single_quote_string_expression ("${") @punctuation.special)
(line_single_quote_string_expression ("}") @punctuation.special)

(annotation (fq_identifier) @attribute)
