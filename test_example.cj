func checkOptionValueByNameAndGetConfigurationKey<T>(name: String, value: T): ConfigurationKey {
    let valueStr = match (value) {
        case tos: ToString => " (${name}.toString='${tos}')"
        case _ => ""
    }
    let option = "Option '${name}'${valueStr}"

    if (let Some(VALIDATORS) <- VALIDATORS.get(name)) {
        for (validator in VALIDATORS) {
            let status = validator(value)
            match (status) {
                case UnknownOptionType => continue
                case ValidOption(configurationKey) => return configurationKey // valid, exit
                case InvalidOption(message) => throw UnittestOptionValidationException(
                    "${option} is invalid. ${message}")
            }
        }

        // no one fit
        throw UnittestOptionValidationException("${option} type is not valid.")
    }

    throw UnittestOptionValidationException("Option '${name}' has no validators. Use @${VALIDATOR_NAME} macro.")
}
