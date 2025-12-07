const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const shared = b.option(bool, "build-shared", "Build a shared library") orelse true;

    const library_name = "tree_sitter_cangjie";

    const lib: *std.Build.Step.Compile = b.addLibrary(.{
        .name = library_name,
        .linkage = if (shared) .dynamic else .static,
        .root_module = b.createModule(.{
            .target = target,
            .optimize = optimize,
            .link_libc = true,
            .pic = if (shared) true else null,
        }),
    });

    lib.addCSourceFile(.{
        .file = b.path("src/parser.c"),
        .flags = &.{"-std=c11"},
    });
    if (fileExists(b, "src/scanner.c")) {
        lib.addCSourceFile(.{
            .file = b.path("src/scanner.c"),
            .flags = &.{"-std=c11"},
        });
    }

    lib.addIncludePath(b.path("src"));

    b.installArtifact(lib);
}

inline fn fileExists(b: *std.Build, filename: []const u8) bool {
    const dir = b.build_root.handle;
    dir.access(filename, .{}) catch return false;
    return true;
}
