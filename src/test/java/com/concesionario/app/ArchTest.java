package com.concesionario.app;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.concesionario.app");

        noClasses()
            .that()
            .resideInAnyPackage("com.concesionario.app.service..")
            .or()
            .resideInAnyPackage("com.concesionario.app.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.concesionario.app.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
