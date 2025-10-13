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

 "where"
] @keyword

[
 "class"
 "interface"
 "struct"
 "enum"
 "type"
] @keyword.type

[
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
] @keyword.operator

[
  "case"
  "match"
  "if"
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

 "abstract"
 "open"
 "sealed"

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

[
  "init"
] @constructor
(enum_constructor (identifier) @constructor)
(enum_pattern_constructor (identifier) @constructor)

(variable_declaration (patterns_maybe_irrefutable (var_binding_pattern (identifier) @variable.member)))
[
  "this"
] @variable.builtin

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

(package_header (fq_identifier (identifier) @module))

(line_single_quote_string_expression ("${") @punctuation.special)
(line_single_quote_string_expression ("}") @punctuation.special)

; (atomic_expression (identifier) @variable) 
