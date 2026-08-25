# ---- Build stage ----
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy only what's needed to resolve dependencies first, so Docker can
# cache this layer and skip re-downloading on unrelated source changes.
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy only the final built JAR from the build stage - no source code,
# no Maven, no build cache ends up in the runtime image.
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]