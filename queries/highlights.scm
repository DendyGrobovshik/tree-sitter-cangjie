(identifier) @variable

[
 "import"
 "package"

 "class"
 "interface"
 "struct"
 "func"
 "prop"
] @keyword

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
  "init"
] @function.builtin

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
] @punctuation.bracket

[
  ","
] @punctuation.delimiter

(function_declaration (identifier) @function)

(type (atomic_type) @type.builtin)

(type (composite_type (fq_identifier (identifier))) @type)

(function_parameter (type) @type)

(function_parameter (identifier) @variable.parameter)

(function_parameter ("_") @variable.parameter.builtin)

(string_literal) @string

