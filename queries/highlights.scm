(identifier) @variable

(ERROR) @error-node

[
 "package"

 "class"
 "interface"
 "struct"
 "func"
 "prop"
 "let"
 "var"
] @keyword

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
] @keyword.return

[
  "super"
] @function.builtin

[
  "init"
] @constructor
(enum_constructor) @constructor


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
  ","
] @punctuation.delimiter

(function_declaration (identifier) @function)
(function_parameter (identifier) @variable.parameter)
(function_parameter ("_") @variable.parameter.builtin)

(type (atomic_type) @type.builtin)
(type (composite_type (fq_identifier (identifier) @type)))

(string_literal) @string

(package_header (fq_identifier (identifier) @module))


