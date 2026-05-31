import { languages } from 'prism-code-editor/prism';

export function Sql() {

  languages.pgsql = languages.postgresql = languages.sql = {
    'comment': {
      pattern: /\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*/g,
      greedy: true
    },

    // Dollar-quoted strings (highest priority)
    'dollar-string': {
      pattern: /\$(?:[_a-zA-Z]\w*)?\$[\s\S]*?\$(?:[_a-zA-Z]\w*)\$/g,
      greedy: true,
      alias: 'string'
    },

    // Escape strings
    'escape-string': {
      pattern: /E(['"])(?:\\[\s\S]|(?!\1)[^\\])*\1/g,
      greedy: true,
      alias: 'string'
    },

    // Standard strings
    'string': {
      pattern: /(^|[^\\@])(['"])(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/g,
      lookbehind: true,
      greedy: true
    },

    // Variables / Parameters
    'variable': /(?:::\s*)?\$[0-9]+|\b\$\w+\b|@\w+/g,

    // === NEW: Table Aliases (e.g. `bgi`, `p`, `pt`) ===
    'alias': {
      pattern: /\b[a-zA-Z_]\w*\b(?=\s+(?:as\s+)?\b(?:from|join|inner|left|right|full|cross)\b)/i,
      greedy: true
    },
    // === NEW: Qualified column references (e.g. `bgi.`, `p.name`) ===
    'qualified-column': {
      pattern: /\b[a-zA-Z_]\w*\s*\.\s*[a-zA-Z_]\w*\b/g,
      inside: {
        'alias': {
          pattern: /^[a-zA-Z_]\w*(?=\s*\.)/,
          greedy: true
        },
        'punctuation': /\./
      }
    },
    // Identifiers (double-quoted)
    'identifier': {
      pattern: /(^|[^"])(")(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/g,
      lookbehind: true,
      inside: {
        'punctuation': /^"|"$/g
      }
    },
    // Cast operator
    'cast': /::[\w.]+/g,
    // Functions
    'function': /\b(?:avg|bool_and|bool_or|count|every|json_agg|jsonb_agg|json_object_agg|jsonb_object_agg|max|min|stddev|stddev_pop|stddev_samp|sum|variance|var_pop|var_samp|array_agg|string_agg|xmlagg|row_number|rank|dense_rank|percent_rank|cume_dist|ntile|lag|lead|first_value|last_value|nth_value|generate_series|generate_subscripts|unnest|array_append|array_cat|array_remove|array_replace|json_build_object|jsonb_build_object|json_build_array|jsonb_build_array|to_json|to_jsonb|json_extract_path|jsonb_extract_path|jsonb_set|jsonb_insert|lower|upper|initcap|trim|split_part|regexp_split_to_array|regexp_replace|regexp_match|now|current_timestamp|current_date|current_time|localtime|localtimestamp|age|date_part|extract|concat|format|overlay|position|substring|overlay|translate)\b(?=\s*\()/i,
    // Keywords
    'keyword': /\b(?:abort|absolute|access|action|add|admin|after|aggregate|all|also|alter|always|analyse|analyze|and|any|array|as|asc|assertion|assignment|asymmetric|at|atomic|attach|attribute|authorization|backward|before|begin|between|bigint|binary|bit|boolean|both|by|cache|called|cascade|cascaded|case|cast|catalog|chain|char|character|characteristics|check|checkpoint|class|coalesce|collate|collation|column|columns|comment|comments|commit|committed|concurrently|configuration|conflict|connection|constraint|constraints|content|continue|conversion|copy|cost|create|cross|csv|cube|current|current_catalog|current_date|current_role|current_schema|current_time|current_timestamp|current_user|cursor|cycle|data|database|day|deallocate|dec|decimal|declare|default|defaults|deferrable|deferred|definer|delete|delimiter|delimiters|desc|detach|dictionary|disable|discard|distinct|do|document|domain|double|drop|each|else|elseif|enable|encoding|encrypted|end|enum|escape|event|except|exclude|excluding|exclusive|execute|exists|explain|extension|external|extract|false|family|fetch|filter|first|float|following|for|force|foreign|format|forward|freeze|from|full|function|functions|generated|global|grant|granted|greatest|group|grouping|groups|handler|having|header|hold|hour|identity|if|ilike|immediate|immutable|implicit|import|in|include|including|increment|index|indexes|inherit|inherits|initially|inline|inner|inout|input|insert|instead|intersect|interval|into|invoker|is|isnull|isolation|join|key|label|language|large|last|lateral|leading|leakproof|least|left|level|like|limit|listen|load|local|localtime|localtimestamp|location|lock|logged|mapping|match|materialized|maxvalue|minute|minvalue|mode|month|move|name|names|national|natural|nchar|new|next|no|none|not|nothing|null|nullif|nulls|numeric|object|of|off|offset|oids|old|on|only|operator|option|options|or|order|ordinality|others|out|outer|over|overlaps|overlay|owned|owner|parallel|parser|partial|partition|passing|password|percent|placing|plans|policy|position|preceding|precision|prepare|prepared|preserve|primary|prior|privileges|procedural|procedure|program|publication|quote|range|read|real|reassign|recheck|recursive|ref|references|referencing|refresh|reindex|relative|release|rename|repeatable|replace|replica|reset|restart|restrict|returning|returns|revoke|right|role|rollback|rollup|routine|routines|row|rows|rule|savepoint|schema|schemas|scroll|search|second|security|select|sequence|sequences|serializable|server|session|session_user|set|sets|share|show|similar|simple|skip|smallint|snapshot|some|sql|stable|standalone|start|statement|statistics|stdin|stdout|storage|strict|strip|substring|support|symmetric|sysid|system|system_user|table|tables|tablesample|tablespace|temp|template|temporary|text|then|time|timestamp|to|trailing|transaction|transform|treat|trigger|trim|true|truncate|trusted|type|types|unbounded|uncommitted|unencrypted|union|unique|unknown|unlisten|unlogged|until|update|usage|user|using|vacuum|valid|validate|validator|value|values|varchar|variadic|varying|verbose|version|view|views|volatile|when|where|while|window|with|within|without|work|wrapper|write|xml|xmlattributes|xmlconcat|xmlelement|xmlforest|xmlparse|xmlpi|xmlroot|xmlserialize|year|yes|zone|left join)\b/i,
    'boolean': /\b(?:true|false|null)\b/i,
    'number': /\b0x[a-f\d_]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?\b/i,
    'operator': /[-+*\/%~^&|!<>=#]+|::|->>|->|#>>\#>|@@|@>|<@|&&|\|\||\?\||\?&|\?-/,
    'punctuation': /[()[\]{}.,;:`]/,
    'json-operator': /->>|->|#>>\#>|@>|<@|&&|\?|\?|&/g
  };
}