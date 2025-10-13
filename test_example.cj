package std.unittest.common

import std.collection.*
import std.sync.ReentrantMutex

public class UnittestOptionValidationException <: Exception {
    init() {
        super()
    }

    init(message: String) {
        super(message)
    }

    protected override func getClassName(): String {
        return "UnittestOptionValidationException"
    }
}

